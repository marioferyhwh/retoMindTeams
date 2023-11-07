import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    getAllUsersByQuery: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
