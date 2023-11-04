import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateAccountDto,
  QueryGetAccountsDto,
  UpdateAccountDto,
} from 'src/accounts/dto/accounts.dto';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async getAllAccountsByQuery(
    params?: QueryGetAccountsDto,
  ): Promise<Account[]> {
    let accountModelFind = this.accountModel.find();
    const { limit, offset } = params;
    if (limit) {
      accountModelFind = accountModelFind.limit(limit);
    }
    if (offset) {
      accountModelFind = accountModelFind.skip(offset);
    }
    return await accountModelFind.exec();
  }

  async getAccountById(id: string) {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  createAccount(account: CreateAccountDto): any {
    const newAccount = new this.accountModel(account);
    return newAccount.save();
  }

  async updateAccountById(id: string, account: UpdateAccountDto) {
    const accountNew = await this.accountModel
      .findByIdAndUpdate(id, { $set: account }, { new: true })
      .exec();
    if (!accountNew) {
      throw new NotFoundException('Account not found');
    }
    return accountNew.save();
  }

  async deleteAccountById(id: string) {
    const accountOld = await this.accountModel.findByIdAndRemove(id).exec();
    if (!accountOld) {
      throw new NotFoundException('Account not found');
    }
    return accountOld;
  }
}
