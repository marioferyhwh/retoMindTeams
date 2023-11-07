import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateAccountDto,
  CreateAccountResponseDto,
  DeleteAccountResponseDto,
  GetAccountResponseDto,
  QueryGetAccountsDto,
  UpdateAccountDto,
  UpdateAccountResponseDto,
} from '../dto/accounts.dto';
import { Account } from '../entities/account.entity';
import { TeamService } from './team.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @Inject(TeamService) private teamService: TeamService,
  ) {}

  async getAllAccountsByQuery(
    params?: QueryGetAccountsDto,
  ): Promise<GetAccountResponseDto[]> {
    let accountModelFind = this.accountModel.find();
    const { limit, offset } = params;
    if (limit) {
      accountModelFind = accountModelFind.limit(limit);
    }
    if (offset) {
      accountModelFind = accountModelFind.skip(offset);
    }
    const account = await accountModelFind.exec();
    return account.map((user) => user.toJSON());
  }

  async getAccountById(id: string): Promise<GetAccountResponseDto> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account.toJSON();
  }

  async createAccount(
    account: CreateAccountDto,
  ): Promise<CreateAccountResponseDto> {
    const team = await this.teamService.getTeamById(account.team);
    account.team = team.id;
    const newAccount = new this.accountModel(account);
    const saveAccount = await newAccount.save();
    return saveAccount.toJSON();
  }

  async updateAccountById(
    id: string,
    account: UpdateAccountDto,
  ): Promise<UpdateAccountResponseDto> {
    if (account.team) {
      const team = await this.teamService.getTeamById(account.team);
      account.team = team.id;
    }

    const accountNew = await this.accountModel
      .findByIdAndUpdate(id, { $set: account }, { new: true })
      .exec();
    if (!accountNew) {
      throw new NotFoundException('Account not found');
    }
    const saveAccount = await accountNew.save();
    return saveAccount.toJSON();
  }

  async deleteAccountById(id: string): Promise<DeleteAccountResponseDto> {
    const accountOld = await this.accountModel.findByIdAndRemove(id).exec();
    if (!accountOld) {
      throw new NotFoundException('Account not found');
    }
    return accountOld.toJSON();
  }
}
