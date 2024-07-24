import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RedisCacheRepository } from 'src/redis-cache.repository';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
    private readonly redisCacheRepository: RedisCacheRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, confirmPassword, ...rest } = createUserDto;

    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      ...rest,
    });

    const savedUser = await this.userRepository.save(user);

    this.kafkaClient.emit('user_created', {
      id: savedUser.id,
      email: savedUser.email,
    });

    await this.redisCacheRepository.saveData(savedUser, `user-${savedUser.id}`);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const cachedUser = await this.redisCacheRepository.getData<User>(
      `user-${id}`,
    );

    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.redisCacheRepository.saveData(user, `user-${id}`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...rest } = updateUserDto;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      Object.assign(user, rest, { password: hashedPassword });
    } else {
      Object.assign(user, rest);
    }

    const updatedUser = await this.userRepository.save(user);

    this.kafkaClient.emit('user_updated', {
      id: updatedUser.id,
      email: updatedUser.email,
    });

    await this.redisCacheRepository.saveData(
      updatedUser,
      `user-${updatedUser.id}`,
    );

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);

    this.kafkaClient.emit('user_deleted', {
      id: user.id,
      email: user.email,
    });

    await this.redisCacheRepository.del(`user-${id}`);
  }
}
