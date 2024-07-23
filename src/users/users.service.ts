import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      if (
        updateUserDto.password &&
        updateUserDto.password !== updateUserDto.confirmPassword
      ) {
        throw new BadRequestException('Passwords do not match');
      }

      const { confirmPassword, ...userDtoWithoutConfirmPassword } =
        updateUserDto;
      await this.userRepository.update(id, userDtoWithoutConfirmPassword);
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}
