import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from '../../auth/models/token.model';
import {
  CreateUserDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  GetProfileResponseDto,
  GetUserResponseDto,
  UpdateProfileDto,
  UpdateProfileResponseDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from '../dto/users.dto';

export const mockUsers1: GetUserResponseDto = {
  id: '001',
  email: 'email1@email.com',
  name: 'user1',
  role: Role.User,
};

export const mockUsers2: GetUserResponseDto = {
  id: '003',
  email: 'email3@email.com',
  name: 'user3',
  role: Role.User,
};
export const mockUserModel = {
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndRemove: jest.fn().mockReturnThis(),
  findOne: jest.fn().mockReturnThis(),
  create: jest.fn().mockReturnThis(),
  save: jest.fn().mockReturnThis(),
  exec: jest.fn().mockReturnThis(),
  new: jest.fn().mockResolvedValue(mockUsers1),
  constructor: jest.fn().mockResolvedValue(mockUsers1),
};

export const mockUsers = [
  { toJSON: jest.fn().mockReturnValue(mockUsers1) },
  { toJSON: jest.fn().mockReturnValue(mockUsers2) },
];

export const mockUsersExpect: GetUserResponseDto[] = [mockUsers1, mockUsers2];

export const jwtUserRoleUser: PayloadToken = { userId: '123', role: Role.User };
export const jwtUserRoleAdmin: PayloadToken = {
  userId: '123',
  role: Role.Admin,
};
export const jwtUserRoleSuperAdmin: PayloadToken = {
  userId: '123',
  role: Role.SuperAdmin,
};

export const createUserDTORoleNone: CreateUserDto = {
  email: 'usernone@email.com',
  name: 'user1',
  password: '123',
};
export const createUserDTORoleUser: CreateUserDto = {
  email: 'useruser@email.com',
  name: 'user2',
  password: '123',
  role: Role.User,
};
export const createUserDTORoleAdmin: CreateUserDto = {
  email: 'useradmin@email.com',
  name: 'use3',
  password: '123',
  role: Role.Admin,
};
export const createUserDTORoleSuperAdmin: CreateUserDto = {
  email: 'usersuperadmin@email.com',
  name: 'user4',
  password: '123',
  role: Role.SuperAdmin,
};

export const createUserResponseDTORoleNone: CreateUserResponseDto = {
  id: '1',
  email: 'usernone@email.com',
  name: 'user1',
  role: Role.User,
};
export const createUserResponseDTORoleUser: CreateUserResponseDto = {
  id: '2',
  email: 'useruser@email.com',
  name: 'user2',
  role: Role.User,
};
export const createUserResponseDTORoleAdmin: CreateUserResponseDto = {
  id: '3',
  email: 'useradmin@email.com',
  name: 'user3',
  role: Role.Admin,
};
export const createUserResponseDTORoleSuperAdmin: CreateUserResponseDto = {
  id: '4',
  email: 'usersuperadmin@email.com',
  name: 'user4',
  role: Role.SuperAdmin,
};

export const mockCreateUserResponseDTORoleUser = {
  toJSON: jest.fn().mockReturnValue(createUserResponseDTORoleUser),
};
export const mockCreateUserResponseDTORoleAdmin = {
  toJSON: jest.fn().mockReturnValue(createUserResponseDTORoleAdmin),
};
export const mockCreateUserResponseDTORoleSuperAdmin = {
  toJSON: jest.fn().mockReturnValue(createUserResponseDTORoleSuperAdmin),
};

export const updateUserDTORoleUser: UpdateUserDto = {
  name: 'user3',
  password: '123',
  role: Role.User,
};
export const updateUserDTORoleAdmin: UpdateUserDto = {
  name: 'user3',
  password: '123',
  role: Role.Admin,
};
export const updateUserDTORoleSuperAdmin: UpdateUserDto = {
  name: 'user3',
  password: '123',
  role: Role.SuperAdmin,
};

export const updateUserResponseDTORoleUser: UpdateUserResponseDto = {
  id: '2',
  email: 'useruser@email.com',
  name: 'user1-1',
  role: Role.User,
};
export const updateUserResponseDTORoleAdmin: UpdateUserResponseDto = {
  id: '3',
  email: 'useradmin@email.com',
  name: 'user2-2',
  role: Role.Admin,
};
export const updateUserResponseDTORoleSuperAdmin: UpdateUserResponseDto = {
  id: '4',
  email: 'usersuperadmin@email.com',
  name: 'user3-3',
  role: Role.SuperAdmin,
};

export const mockUpdateUserResponseDTORoleUser = {
  toJSON: jest.fn().mockReturnValue(updateUserResponseDTORoleUser),
};
export const mockUpdateUserResponseDTORoleAdmin = {
  toJSON: jest.fn().mockReturnValue(updateUserResponseDTORoleAdmin),
};
export const mockUpdateUserResponseDTORoleSuperAdmin = {
  toJSON: jest.fn().mockReturnValue(updateUserResponseDTORoleSuperAdmin),
};
export const deleteUserResponseDTORoleUser: DeleteUserResponseDto = {
  id: '2',
  email: 'useruser@email.com',
  name: 'user1-1',
  role: Role.User,
};

export const mockDeleteUserResponseDTORoleUser = {
  toJSON: jest.fn().mockReturnValue(deleteUserResponseDTORoleUser),
};
export const GetUserResponseDTO1: GetUserResponseDto = {
  id: '12dsfa',
  email: 'email3@email.com',
  name: 'user3',
  role: Role.User,
};

export const mockProfile1: GetProfileResponseDto = {
  id: '001',
  email: 'email1@email.com',
  name: 'user1',
  role: Role.User,
};

export const mockUpdateProfile: UpdateProfileDto = {
  password: '222222',
};

export const mockProfileUpdate1: UpdateProfileResponseDto = {
  id: '001',
  email: 'email1@email.com',
  name: 'user1',
  role: Role.User,
};
