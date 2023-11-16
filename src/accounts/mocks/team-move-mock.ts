import {
  CreateTeamMoveDto,
  GetTeamMoveResponseDto,
  QueryGetTeamMovesDto,
  UpdateTeamMoveDto,
  UpdateTeamMoveResponseDto,
} from '../dto/team-move.dto';

export const mockTeamMoveModel = {
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

export const queryGetTeamMovesDto: QueryGetTeamMovesDto = {
  activated: true,
  limit: 10,
  offset: 2,
  nameTeam: 'team',
  nameUser: 'name',
  team: '1',
  endDate: new Date(),
  startDate: new Date(),
};

export const getTeamMoveResponseDto1: GetTeamMoveResponseDto = {
  id: 'qqqq',
  team: '',
  nameTeam: '',
  user: '',
  endDate: new Date(),
  startDate: new Date(),
};

export const getTeamMoveResponseDto2: GetTeamMoveResponseDto = {
  id: 'qqqq',
  team: '11',
  nameTeam: '11',
  user: '11',
  endDate: new Date(),
  startDate: new Date(),
};

export const mockGetTeamMoveResponse = [
  { toJSON: jest.fn().mockReturnValue(getTeamMoveResponseDto1) },
  { toJSON: jest.fn().mockReturnValue(getTeamMoveResponseDto2) },
];

export const mockGetTeamMoveResponseExpect: GetTeamMoveResponseDto[] = [
  getTeamMoveResponseDto1,
  getTeamMoveResponseDto2,
];

export const createTeamMoveDto: CreateTeamMoveDto = {
  team: '11',
  nameTeam: '11',
  user: '11',
};

export const updateTeamMoveDto: UpdateTeamMoveDto = {
  endDate: new Date(),
};

export const updateTeamMoveResponseDto: UpdateTeamMoveResponseDto = {
  id: '1',
  team: '11',
  nameTeam: '11',
  user: '11',
  endDate: new Date(),
};

export const mockUpdateTeamMoveResponse = {
  toJSON: jest.fn().mockReturnValue(updateTeamMoveResponseDto),
};
