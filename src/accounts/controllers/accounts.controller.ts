import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { MongoIdPipe } from '../../common/pipes/mongo-id/mongo-id.pipe';
import {
  DELETE_ACCOUNT_BY_ID,
  GET_ACCOUNT,
  GET_ACCOUNT_BY_ID,
  POST_ACCOUNT,
  PUT_ACCOUNT_BY_ID,
} from '../constants/routes.constant';
import {
  CreateAccountDto,
  CreateAccountResponseDto,
  DeleteAccountResponseDto,
  GetAccountResponseDto,
  QueryGetAccountsDto,
  UpdateAccountDto,
  UpdateAccountResponseDto,
} from '../dto/accounts.dto';
import { AccountsService } from '../services/accounts.service';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AccountsController {
  constructor(private accountService: AccountsService) {}

  @ApiOperation({
    summary: 'create account',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiBody({ type: CreateAccountDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Post(POST_ACCOUNT)
  postAccount(
    @Body() account: CreateAccountDto,
  ): Promise<CreateAccountResponseDto> {
    return this.accountService.createAccount(account);
  }

  @ApiOperation({
    summary: 'list Accounts',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_ACCOUNT)
  getAccounts(
    @Query() params: QueryGetAccountsDto,
  ): Promise<GetAccountResponseDto[]> {
    return this.accountService.getAllAccountsByQuery(params);
  }

  @ApiOperation({
    summary: 'get account by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_ACCOUNT_BY_ID)
  getAccount(
    @Param('accountId', MongoIdPipe) accountId: string,
  ): Promise<GetAccountResponseDto> {
    return this.accountService.getAccountById(accountId);
  }

  @ApiOperation({
    summary: 'update account by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiBody({ type: UpdateAccountDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Put(PUT_ACCOUNT_BY_ID)
  putAccount(
    @Param('accountId', MongoIdPipe) accountId: string,
    @Body() account: UpdateAccountDto,
  ): Promise<UpdateAccountResponseDto> {
    return this.accountService.updateAccountById(accountId, account);
  }

  @ApiOperation({
    summary: 'remove account by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete(DELETE_ACCOUNT_BY_ID)
  deleteAccount(
    @Param('accountId', MongoIdPipe) accountId: string,
  ): Promise<DeleteAccountResponseDto> {
    return this.accountService.deleteAccountById(accountId);
  }
}
