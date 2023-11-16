import {
  CreateTeamDto,
  CreateTeamResponseDto,
  GetTeamResponseDto,
  QueryGetTeamsDto,
  UpdateTeamDto,
  UpdateTeamResponseDto,
} from '../dto/team.dto';

export const mockTeamModel = {
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
};

export const mockTeamMoveService = {
  createTeamMove: jest.fn(),
  endTeamMove: jest.fn(),
};

export const queryGetTeams1: QueryGetTeamsDto = {
  limit: 1,
  offset: 1,
};

export const getTeamResponse1: GetTeamResponseDto = {
  id: 'qq',
  name: 'team',
  users: ['1'],
};

export const getTeamResponse2: GetTeamResponseDto = {
  id: 'qq',
  name: 'team',
  users: ['2', '3'],
};

export const mockGetTeamResponse = [
  { toJSON: jest.fn().mockReturnValue(getTeamResponse1) },
  { toJSON: jest.fn().mockReturnValue(getTeamResponse2) },
];

export const mockGetTeamResponseExpect: GetTeamResponseDto[] = [
  getTeamResponse1,
  getTeamResponse2,
];

export const createTeam1: CreateTeamDto = {
  name: 'team',
  users: ['1'],
};

export const createTeamResponse1: CreateTeamResponseDto = {
  id: 'qq',
  name: 'team',
  users: ['1'],
};

export const mockCreateTeamResponse1 = {
  _id: '1',
  ...createTeamResponse1,
  toJSON: jest.fn().mockReturnValue(createTeamResponse1),
};

export const updateTeam1: UpdateTeamDto = {
  users: ['2', '1'],
};

export const updateTeamResponse1: UpdateTeamResponseDto = {
  id: 'qq',
  name: 'team',
  users: ['1'],
};

export const mockUpdateTeamResponse1 = {
  toJSON: jest.fn().mockReturnValue(updateTeamResponse1),
};
