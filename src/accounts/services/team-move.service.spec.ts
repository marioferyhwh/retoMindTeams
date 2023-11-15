import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { TeamMove } from '../entities/team-move.entity';
import { TeamMoveService } from './team-move.service';

describe('TeamMoveService', () => {
  let service: TeamMoveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamMoveService,
        {
          provide: getModelToken(TeamMove.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    service = module.get<TeamMoveService>(TeamMoveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
