import {
  CreateAccountDto,
  CreateAccountResponseDto,
  DeleteAccountResponseDto,
  GetAccountResponseDto,
  QueryGetAccountsDto,
} from '../dto/accounts.dto';

export const mockAccountModel = {
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
  toJSON: jest.fn().mockReturnThis(),
};

export const mockTeamService = {
  getTeamById: jest.fn(),
};

export const queryGetAccounts1: QueryGetAccountsDto = {
  limit: 1,
  offset: 1,
};

export const getAccountResponse1: GetAccountResponseDto = {
  id: '1',
  nameAccount: 'account',
  nameClient: 'client',
  nameCharge: 'jose',
  team: 'dadasdasda',
};

export const getAccountResponse2: GetAccountResponseDto = {
  id: '2',
  nameAccount: 'account',
  nameClient: 'client',
  nameCharge: 'jose',
  team: 'dadasdasda',
};

export const mockGetAccountResponse = [
  { toJSON: jest.fn().mockReturnValue(getAccountResponse1) },
  { toJSON: jest.fn().mockReturnValue(getAccountResponse2) },
];
export const mockGetAccountResponseExpect: GetAccountResponseDto[] = [
  getAccountResponse1,
  getAccountResponse2,
];

export const createAccount1: CreateAccountDto = {
  nameAccount: 'account',
  nameClient: 'client',
  nameCharge: 'jose',
  team: 'dadasdasda',
};

export const createAccountResponse1: CreateAccountResponseDto = {
  id: '1',
  nameAccount: 'account',
  nameClient: 'client',
  nameCharge: 'jose',
  team: 'dadasdasda',
};

export const mockCreateAccountResponse1 = {
  _id: '1',
  toJSON: jest.fn().mockReturnValue(createAccountResponse1),
};

export const deleteAccountResponse1: DeleteAccountResponseDto = {
  id: '1',
  nameAccount: 'account',
  nameClient: 'client',
  nameCharge: 'jose',
  team: 'dadasdasda',
};
