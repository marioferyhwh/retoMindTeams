import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DELETE_ACCOUNT_BY_ID,
  GET_ACCOUNT,
  GET_ACCOUNT_BY_ID,
  POST_ACCOUNT,
  PUT_ACCOUNT_BY_ID,
} from '../constants/routes.constant';

import {
  CreateAccountDto,
  QueryGetAccountsDto,
  UpdateAccountDto,
} from 'src/accounts/dto/accounts.dto';
import { AccountsService } from 'src/accounts/services/accounts.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Accounts')
@Controller()
export class AccountsController {
  constructor(private accountService: AccountsService) {}

  @Post(POST_ACCOUNT)
  @ApiOperation({
    summary: 'create account',
  })
  postAccount(@Body() account: CreateAccountDto) {
    return this.accountService.createAccount(account);
  }

  @Get(GET_ACCOUNT)
  @ApiOperation({ summary: 'list Accounts' })
  getAccounts(@Query() params: QueryGetAccountsDto) {
    return this.accountService.getAllAccountsByQuery(params);
  }

  @Get(GET_ACCOUNT_BY_ID)
  @ApiOperation({ summary: 'get account by id' })
  getAccount(@Param('accountId', MongoIdPipe) accountId: string) {
    return this.accountService.getAccountById(accountId);
  }

  @Put(PUT_ACCOUNT_BY_ID)
  @ApiOperation({ summary: 'update account by id' })
  putAccount(
    @Param('accountId', MongoIdPipe) accountId: string,
    @Body() account: UpdateAccountDto,
  ) {
    return this.accountService.updateAccountById(accountId, account);
  }

  @Delete(DELETE_ACCOUNT_BY_ID)
  @ApiOperation({ summary: 'remove account by id' })
  deleteAccount(@Param('accountId', MongoIdPipe) accountId: string) {
    return this.accountService.deleteAccountById(accountId);
  }
}
