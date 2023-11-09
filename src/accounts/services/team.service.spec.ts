import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { TeamMove } from '../entities/team-move.entity';
import { Team } from '../entities/team.entity';
import { TeamMoveService } from './team-move.service';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getModelToken(Team.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
        TeamMoveService,
        {
          provide: getModelToken(TeamMove.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
