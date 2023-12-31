import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UpdateProfileDto } from '../dto/users.dto';
import { User } from '../entities/user.entity';
import {
  GetUserResponseDTO1,
  createUserDTORoleAdmin,
  createUserDTORoleNone,
  createUserDTORoleUser,
  createUserResponseDTORoleAdmin,
  createUserResponseDTORoleUser,
  deleteUserResponseDTORoleUser,
  jwtUserRoleAdmin,
  jwtUserRoleSuperAdmin,
  jwtUserRoleUser,
  mockCreateUserResponseDTORoleAdmin,
  mockCreateUserResponseDTORoleUser,
  mockDeleteUserResponseDTORoleUser,
  mockProfile1,
  mockProfileUpdate1,
  mockUpdateProfile,
  mockUpdateUserResponseDTORoleUser,
  mockUserModel,
  mockUsers,
  mockUsersExpect,
  updateUserDTORoleAdmin,
  updateUserDTORoleUser,
  updateUserResponseDTORoleUser,
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
    it('should create a user Admin and return the created user', async () => {
      userModel.create = jest
        .fn()
        .mockResolvedValue(mockCreateUserResponseDTORoleAdmin);

      const result = await usersService.createUser(
        jwtUserRoleSuperAdmin,
        createUserDTORoleAdmin,
      );

      expect(result).toEqual(createUserResponseDTORoleAdmin);
    });

    it('should create a user without role and return the created user', async () => {
      userModel.create = jest
        .fn()
        .mockResolvedValue(mockCreateUserResponseDTORoleUser);

      const result = await usersService.createUser(
        jwtUserRoleAdmin,
        createUserDTORoleNone,
      );

      expect(result).toEqual(createUserResponseDTORoleUser);
    });

    it('should create a user and return the created user', async () => {
      userModel.create = jest
        .fn()
        .mockResolvedValue(mockCreateUserResponseDTORoleUser);

      const result = await usersService.createUser(
        jwtUserRoleAdmin,
        createUserDTORoleUser,
      );

      expect(result).toEqual(createUserResponseDTORoleUser);
    });

    it('should throw UnauthorizedException for unauthorized user role User', async () => {
      const result = usersService.createUser(
        jwtUserRoleUser,
        createUserDTORoleUser,
      );

      await expect(result).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for unauthorized user role Admin', async () => {
      const result = usersService.createUser(
        jwtUserRoleAdmin,
        createUserDTORoleAdmin,
      );

      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('updateUserById', () => {
    it('should update a user to role Admin and return the updated user', async () => {
      userModel.save = jest
        .fn()
        .mockResolvedValue(mockUpdateUserResponseDTORoleUser);

      const userId = '456';

      const result = await usersService.updateUserById(
        jwtUserRoleSuperAdmin,
        userId,
        updateUserDTORoleAdmin,
      );

      expect(result).toEqual(updateUserResponseDTORoleUser);
    });

    it('should update a user and return the updated user', async () => {
      userModel.save = jest
        .fn()
        .mockResolvedValue(mockUpdateUserResponseDTORoleUser);

      const userId = '456';

      const result = await usersService.updateUserById(
        jwtUserRoleAdmin,
        userId,
        updateUserDTORoleUser,
      );

      expect(result).toEqual(updateUserResponseDTORoleUser);
    });

    it('should throw NotFoundException for edit user', async () => {
      userModel.exec = jest.fn().mockResolvedValue(null);

      const userId = '456';

      const result = usersService.updateUserById(
        jwtUserRoleAdmin,
        userId,
        updateUserDTORoleUser,
      );

      await expect(result).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException for unauthorized edit user', async () => {
      const userId = jwtUserRoleUser.userId + '1';
      const result = usersService.updateUserById(
        jwtUserRoleUser,
        userId,
        updateUserDTORoleUser,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for unauthorized change user role', async () => {
      const userId = jwtUserRoleUser.userId;
      const result = usersService.updateUserById(
        jwtUserRoleUser,
        userId,
        updateUserDTORoleAdmin,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user and return the deleted user', async () => {
      userModel.exec = jest
        .fn()
        .mockResolvedValue(mockDeleteUserResponseDTORoleUser);

      const userId = jwtUserRoleAdmin.userId + '1';

      const result = await usersService.deleteUserById(
        jwtUserRoleAdmin,
        userId,
      );

      expect(result).toEqual(deleteUserResponseDTORoleUser);
      expect(userModel.findByIdAndRemove).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException', async () => {
      userModel.exec = jest.fn().mockResolvedValue(null);

      const userId = jwtUserRoleAdmin.userId + '1';

      const result = usersService.deleteUserById(jwtUserRoleAdmin, userId);

      await expect(result).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException for unauthorized deletion of own account', async () => {
      const result = usersService.deleteUserById(
        jwtUserRoleUser,
        jwtUserRoleUser.userId,
      );

      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getUserByEmail', () => {
    it('should delete a user and return the deleted user', async () => {
      userModel.exec = jest.fn().mockResolvedValue(GetUserResponseDTO1);

      const result = await usersService.getUserByEmail(
        GetUserResponseDTO1.email,
      );

      expect(result).toEqual(GetUserResponseDTO1);
    });
  });

  describe('getProfileById', () => {
    it('should return a user profile', async () => {
      userModel.toJSON = jest.fn().mockResolvedValue(mockProfile1);
      const id = jwtUserRoleUser.userId;

      const result = await usersService.getProfileById(id);

      expect(result).toEqual(mockProfile1);
      expect(userModel.findById).toHaveBeenCalledWith(id);
    });
    it('should throw NotFoundException if user is not found', async () => {
      userModel.exec = jest.fn().mockResolvedValue(null);

      await expect(
        usersService.getProfileById(jwtUserRoleUser.userId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfileById', () => {
    it('should update a user to role Admin and return the updated user', async () => {
      userModel.toJSON = jest.fn().mockResolvedValue(mockProfileUpdate1);

      const userId = '456';

      const result = await usersService.updateProfileById(
        userId,
        mockUpdateProfile,
      );

      expect(result).toEqual(mockProfileUpdate1);
    });

    it('should throw NotFoundException for edit user profile', async () => {
      userModel.exec = jest.fn().mockResolvedValue(null);

      const userId = '456';

      const result = usersService.updateProfileById(userId, UpdateProfileDto);

      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
