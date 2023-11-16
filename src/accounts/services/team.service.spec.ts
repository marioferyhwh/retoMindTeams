import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Team } from '../entities/team.entity';
import {
  createTeam1,
  createTeamResponse1,
  getTeamResponse2,
  mockCreateTeamResponse1,
  mockGetTeamResponse,
  mockGetTeamResponseExpect,
  mockTeamModel,
  mockTeamMoveService,
  mockUpdateTeamResponse1,
  queryGetTeams1,
  updateTeam1,
  updateTeamResponse1,
} from '../mocks/team-mock';
import { TeamMoveService } from './team-move.service';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let teamService: TeamService;
  let teamMoveService: TeamMoveService;
  let TeamModel;

  beforeEach(async () => {
    TeamModel = { ...mockTeamModel };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getModelToken(Team.name),
          useValue: TeamModel,
        },
        {
          provide: TeamMoveService,
          useValue: mockTeamMoveService,
        },
      ],
    }).compile();

    teamService = module.get<TeamService>(TeamService);
    teamMoveService = module.get<TeamMoveService>(TeamMoveService);
  });

  it('should be defined', () => {
    expect(teamService).toBeDefined();
  });

  describe('getAllTeamsByQuery', () => {
    it('should get all teams by query', async () => {
      TeamModel.exec = jest.fn().mockResolvedValue(mockGetTeamResponse);

      const result = await teamService.getAllTeamsByQuery(queryGetTeams1);

      expect(TeamModel.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockGetTeamResponseExpect);
    });
  });

  describe('getTeamById', () => {
    it('should get team by ID', async () => {
      TeamModel.exec = jest.fn().mockResolvedValue(mockGetTeamResponse[0]);

      const result = await teamService.getTeamById('teamId');

      expect(TeamModel.findById).toHaveBeenCalledWith('teamId');
      expect(result).toEqual(mockGetTeamResponseExpect[0]);
    });

    it('should throw NotFoundException if team not found', async () => {
      TeamModel.exec = jest.fn().mockResolvedValue(null);

      await expect(
        teamService.getTeamById('nonexistentTeamId'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createTeam', () => {
    it('should create a team', async () => {
      TeamModel.create.mockResolvedValue(mockCreateTeamResponse1);

      const result = await teamService.createTeam(createTeam1);

      expect(TeamModel.create).toHaveBeenCalledWith(createTeam1);
      expect(teamMoveService.createTeamMove).toHaveBeenCalledWith(
        expect.objectContaining({
          team: expect.any(String),
          user: expect.any(String),
          nameTeam: expect.any(String),
        }),
      );

      expect(result).toEqual(createTeamResponse1);
    });
  });

  describe('updateTeamById', () => {
    it('should update a team by ID', async () => {
      const mockTeamId = 'teamId';

      teamService.getTeamById = jest.fn().mockResolvedValue(getTeamResponse2);
      TeamModel.save = jest.fn().mockResolvedValue(mockUpdateTeamResponse1);
      mockTeamMoveService.createTeamMove.mockResolvedValue(null);

      const result = await teamService.updateTeamById(mockTeamId, updateTeam1);

      expect(teamService.getTeamById).toHaveBeenCalledWith(mockTeamId);
      expect(TeamModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(mockTeamMoveService.createTeamMove).toHaveBeenCalledWith(
        expect.objectContaining({
          team: expect.any(String),
          user: expect.any(String),
          nameTeam: expect.any(String),
        }),
      );

      expect(result).toEqual(updateTeamResponse1);
    });
  });
});
