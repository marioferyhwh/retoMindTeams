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
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtUser } from '../../auth/decorators/jwt-payload.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from '../../auth/models/token.model';
import { MongoIdPipe } from '../../common/pipes/mongo-id/mongo-id.pipe';
import {
  DELETE_USER_BY_ID,
  GET_USER,
  GET_USER_BY_ID,
  POST_USER,
  PUT_USER_BY_ID,
} from '../constants/routes.constant';
import {
  CreateUserDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  GetUserResponseDto,
  QueryGetUsersDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'create user',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'create user successful',
    type: CreateUserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Post(POST_USER)
  postUser(
    @Body() user: CreateUserDto,
    @JwtUser() jwtUser: PayloadToken,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(jwtUser, user);
  }

  @ApiOperation({
    summary: 'list Users',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_USER)
  getUsers(@Query() params: QueryGetUsersDto): Promise<GetUserResponseDto[]> {
    return this.userService.getAllUsersByQuery(params);
  }

  @ApiOperation({
    summary: 'get user by id',
  })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID of User' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @Get(GET_USER_BY_ID)
  getUser(
    @Param('userId', MongoIdPipe) userId: string,
    @JwtUser() jwtUser: PayloadToken,
  ): Promise<GetUserResponseDto> {
    return this.userService.getUserById(jwtUser, userId);
  }

  @ApiOperation({
    summary: 'update user by id',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID of User' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @Put(PUT_USER_BY_ID)
  putUser(
    @Param('userId', MongoIdPipe) userId: string,
    @JwtUser() jwtUser: PayloadToken,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateUserById(jwtUser, userId, user);
  }

  @ApiOperation({
    summary: 'remove user by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID of User' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete(DELETE_USER_BY_ID)
  deleteUser(
    @Param('userId', MongoIdPipe) userId: string,
    @JwtUser() jwtUser: PayloadToken,
  ): Promise<DeleteUserResponseDto> {
    return this.userService.deleteUserById(jwtUser, userId);
  }
}
