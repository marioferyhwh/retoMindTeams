import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from '../../auth/models/token.model';
import {
  CreateUserDto,
  GetUserResponseDto,
  UpdateUserDto,
} from '../dto/users.dto';
import { EnglishLevel } from '../entities/user.entity';

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
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
};
export const createUserDTORoleUser: CreateUserDto = {
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
  role: Role.User,
};
export const createUserDTORoleAdmin: CreateUserDto = {
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
  role: Role.Admin,
};
export const createUserDTORoleSuperAdmin: CreateUserDto = {
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
  role: Role.SuperAdmin,
};

export const mockCreateUSerDTORoleUser = {
  toJSON: jest.fn().mockReturnValue(createUserDTORoleUser),
};
export const mockCreateUSerDTORoleAdmin = {
  toJSON: jest.fn().mockReturnValue(createUserDTORoleAdmin),
};
export const mockCreateUSerDTORoleSuperAdmin = {
  toJSON: jest.fn().mockReturnValue(createUserDTORoleSuperAdmin),
};

export const updateUserDTORoleUser: UpdateUserDto = {
  name: 'user3',
  password: '123',
  englishLevel: EnglishLevel.A1,
  technicalKnowledge: 'node',
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

export const mockUpdateUserDTORoleUser = {
  toJSON: jest.fn().mockReturnValue(updateUserDTORoleUser),
};
export const mockUpdateUserDTORoleAdmin = {
  toJSON: jest.fn().mockReturnValue(updateUserDTORoleAdmin),
};
export const mockUpdateUserDTORoleSuperAdmin = {
  toJSON: jest.fn().mockReturnValue(updateUserDTORoleSuperAdmin),
};

export const GetUserResponseDTO1: GetUserResponseDto = {
  id: '12dsfa',
  email: 'email3@email.com',
  name: 'user3',
  englishLevel: EnglishLevel.A1,
  technicalKnowledge: 'node',
  role: Role.User,
};
