import { PayloadToken } from 'src/auth/models/token.model';
import { Role } from '../../auth/models/roles.model';
import { CreateUserDto, GetUserResponseDto } from '../dto/users.dto';

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
export const createUSerDTORoleUser: CreateUserDto = {
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
  role: Role.User,
};
export const createUSerDTORoleAdmin: CreateUserDto = {
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
  role: Role.Admin,
};
export const createUSerDTORoleSuperAdmin: CreateUserDto = {
  email: 'email3@email.com',
  name: 'user3',
  password: '123',
  role: Role.SuperAdmin,
};

export const mockCreateUSerDTORoleUser = {
  toJSON: jest.fn().mockReturnValue(createUSerDTORoleUser),
};
export const mockCreateUSerDTORoleAdmin = {
  toJSON: jest.fn().mockReturnValue(createUSerDTORoleAdmin),
};
export const mockCreateUSerDTORoleSuperAdmin = {
  toJSON: jest.fn().mockReturnValue(createUSerDTORoleSuperAdmin),
};
