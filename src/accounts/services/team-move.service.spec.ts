import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/services/users.service';
import { TeamMove } from '../entities/team-move.entity';
import {
  createTeamMoveDto,
  mockGetTeamMoveResponse,
  mockGetTeamMoveResponseExpect,
  mockTeamMoveModel,
  mockUpdateTeamMoveResponse,
  queryGetTeamMovesDto,
  updateTeamMoveDto,
  updateTeamMoveResponseDto,
} from '../mocks/team-move-mock';
import { TeamMoveService } from './team-move.service';

describe('TeamMoveService', () => {
  let service: TeamMoveService;
  let userService: UsersService;
  let teamMoveModel: any;

  beforeEach(async () => {
    teamMoveModel = { ...mockTeamMoveModel };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamMoveService,
        {
          provide: getModelToken(TeamMove.name),
          useValue: teamMoveModel,
        },
        { provide: UsersService, useValue: { getUserById: jest.fn() } },
      ],
    }).compile();

    service = module.get<TeamMoveService>(TeamMoveService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllTeamMovesByQuery', () => {
    it('should find team move by query', async () => {
      teamMoveModel.exec = jest.fn().mockResolvedValue(mockGetTeamMoveResponse);

      const result = await service.getAllTeamMovesByQuery(queryGetTeamMovesDto);

      expect(result).toEqual(mockGetTeamMoveResponseExpect);
    });
  });
  describe('createTeamMove', () => {
    it('should create team move', async () => {
      teamMoveModel.exec = jest.fn().mockResolvedValue(mockGetTeamMoveResponse);
      teamMoveModel.create = jest
        .fn()
        .mockResolvedValue(mockGetTeamMoveResponse[0]);
      userService.getUserById = jest.fn().mockResolvedValue({ name: '' });

      const result = await service.createTeamMove(createTeamMoveDto);

      expect(result).toEqual(mockGetTeamMoveResponseExpect[0]);
    });
  });

  describe('updateTeamMove', () => {
    it('should update team move', async () => {
      teamMoveModel.save = jest
        .fn()
        .mockResolvedValue(mockUpdateTeamMoveResponse);

      const result = await service.updateTeamMove('', updateTeamMoveDto);

      expect(result).toEqual(updateTeamMoveResponseDto);
    });
    it('should not update team move', async () => {
      teamMoveModel.exec = jest.fn().mockResolvedValue(null);

      const result = service.updateTeamMove('', updateTeamMoveDto);

      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('endTeamMove', () => {
    it('should end team move', async () => {
      await service.endTeamMove('team', 'user');

      expect(teamMoveModel.findOne).toHaveBeenCalledWith({
        activated: true,
        team: 'team',
        user: 'user',
      });
    });
  });
});
