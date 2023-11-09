import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../entities/user.entity';
import {
  createUSerDTORoleUser,
  jwtUserRoleAdmin,
  jwtUserRoleUser,
  mockCreateUSerDTORoleUser,
  mockUserModel,
  mockUsers,
  mockUsersExpect,
} from '../mocks/user-mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: any;

  beforeEach(async () => {
    userModel = { ...mockUserModel };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getAllUsersByQuery', () => {
    it('should return an array of users', async () => {
      userModel.exec = jest.fn().mockResolvedValue(mockUsers);

      const result = await usersService.getAllUsersByQuery({
        limit: 10,
        offset: 10,
      });

      expect(result).toEqual(expect.arrayContaining(mockUsersExpect));
      expect(userModel.find).toHaveBeenCalledWith();
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      userModel.exec = jest.fn().mockResolvedValue(mockUsers[0]);
      const id = jwtUserRoleUser.userId;

      const result = await usersService.getUserById(jwtUserRoleUser, id);

      expect(result).toEqual(mockUsersExpect[0]);
      expect(userModel.findById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if user is not found', async () => {
      userModel.exec = jest.fn().mockResolvedValue(null);
      const id = jwtUserRoleUser.userId;

      await expect(
        usersService.getUserById(jwtUserRoleUser, id),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException for unauthorized access', async () => {
      const id = '456';

      await expect(
        usersService.getUserById(jwtUserRoleUser, id),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('createUser', () => {
    it('should create a user and return the created user', async () => {
      userModel.create = jest.fn().mockResolvedValue(mockCreateUSerDTORoleUser);

      const result = await usersService.createUser(
        jwtUserRoleAdmin,
        createUSerDTORoleUser,
      );

      expect(result).toEqual(createUSerDTORoleUser);
    });
  });

  it('should throw UnauthorizedException for unauthorized user role', async () => {
    const result = usersService.createUser(
      jwtUserRoleUser,
      createUSerDTORoleUser,
    );

    await expect(result).rejects.toThrow(UnauthorizedException);
  });
});
