import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUsersService = () => ({
  create: jest.fn().mockResolvedValue({} as User),
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({} as User),
  update: jest.fn().mockResolvedValue({} as User),
  remove: jest.fn().mockResolvedValue(undefined),
});

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useFactory: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    const result = await controller.create(createUserDto);

    expect(result).toEqual({} as User);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    const result = await controller.findAll();

    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const userId = 'someId';
    const result = await controller.findOne(userId);

    expect(result).toEqual({} as User);
    expect(service.findOne).toHaveBeenCalledWith(userId);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
      email: 'updated@example.com',
    };
    const userId = 'someId';

    const result = await controller.update(userId, updateUserDto);

    expect(result).toEqual({} as User);
    expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
  });

  it('should remove a user', async () => {
    const userId = 'someId';

    const result = await controller.remove(userId);

    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(userId);
  });
});
