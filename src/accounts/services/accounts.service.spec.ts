import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { Account } from '../entities/account.entity';
import { TeamMove } from '../entities/team-move.entity';
import { Team } from '../entities/team.entity';
import { AccountsService } from './accounts.service';
import { TeamMoveService } from './team-move.service';
import { TeamService } from './team.service';

describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Account.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
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

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAccountsByQuery', () => {});

  describe('getAccountById', () => {});

  describe('createAccount', () => {});

  describe('updateAccountById', () => {});

  describe('deleteAccountById', () => {});
});
