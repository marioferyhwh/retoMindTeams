import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Account } from '../entities/account.entity';
import {
  createAccount1,
  createAccountResponse1,
  deleteAccountResponse1,
  mockAccountModel,
  mockGetAccountResponse,
  mockGetAccountResponseExpect,
  mockTeamService,
  queryGetAccounts1,
} from '../mocks/accounts-mock';
import { AccountsService } from './accounts.service';
import { TeamService } from './team.service';
import { getTeamResponse2 } from '../mocks/team-mock';
describe('AccountsService', () => {
  let service: AccountsService;
  let teamService: TeamService;
  let accountModel: any;

  beforeEach(async () => {
    accountModel = { ...mockAccountModel };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getModelToken(Account.name),
          useValue: accountModel,
        },
        {
          provide: TeamService,
          useValue: mockTeamService,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    teamService = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(teamService).toBeDefined();
  });

  describe('getAllAccountsByQuery', () => {
    it('should find accounts by query', async () => {
      accountModel.exec = jest.fn().mockResolvedValue(mockGetAccountResponse);
      const result = await service.getAllAccountsByQuery(queryGetAccounts1);

      expect(accountModel.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockGetAccountResponseExpect);
    });
  });

  describe('getAccountById', () => {
    it('should find account by id', async () => {
      const accountId = 'exampleAccountId';
      await service.getAccountById(accountId);
      expect(accountModel.findById).toHaveBeenCalledWith(accountId);
    });

    it('should throw NotFoundException if account not found', async () => {
      accountModel.exec.mockResolvedValueOnce(null);
      await expect(
        service.getAccountById('nonexistentId'),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('createAccount', () => {
    it('should create account', async () => {
      teamService.getTeamById = jest.fn().mockResolvedValue(getTeamResponse2);
      accountModel.toJSON.mockResolvedValueOnce(createAccountResponse1);
      const result = await service.createAccount(createAccount1);
      expect(accountModel.create).toHaveBeenCalledWith(createAccount1);
      expect(result).toEqual(createAccountResponse1);
    });
  });

  describe.only('updateAccountById', () => {
    it('should throw NotFoundException if account not found', async () => {
      accountModel.exec.mockResolvedValueOnce(null);
      await expect(
        service.updateAccountById('nonexistentId', {}),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAccountById', () => {
    it('should delete account by id', async () => {
      const accountId = 'exampleAccountId';

      accountModel.toJSON.mockResolvedValueOnce(deleteAccountResponse1);
      const result = await service.deleteAccountById(accountId);
      expect(accountModel.findByIdAndRemove).toHaveBeenCalledWith(accountId);
      expect(result).toEqual(deleteAccountResponse1);
    });

    it('should throw NotFoundException if account not found', async () => {
      accountModel.exec.mockResolvedValueOnce(null);
      await expect(service.deleteAccountById('nonexistentId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
