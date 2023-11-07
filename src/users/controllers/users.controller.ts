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
import { Roles } from 'src/auth/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { MongoIdPipe } from 'src/common/pipes/mongo-id/mongo-id.pipe';
import {
  DELETE_USER_BY_ID,
  GET_USER,
  GET_USER_BY_ID,
  POST_USER,
  PUT_USER_BY_ID,
} from 'src/users/constants/routes.constant';
import {
  CreateUserDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  GetUserResponseDto,
  QueryGetUsersDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/services/users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Users')
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
  postUser(@Body() user: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(user);
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_USER)
  @ApiOperation({
    summary: 'list Users',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  getUsers(@Query() params: QueryGetUsersDto): Promise<GetUserResponseDto[]> {
    return this.userService.getAllUsersByQuery(params);
  }

  @ApiOperation({
    summary: 'get user by id',
  })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID of User' })
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @Get(GET_USER_BY_ID)
  getUser(
    @Param('userId', MongoIdPipe) userId: string,
  ): Promise<GetUserResponseDto> {
    return this.userService.getUserById(userId);
  }

  @ApiOperation({
    summary: 'update user by id',
  })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID of User' })
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @Put(PUT_USER_BY_ID)
  putUser(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateUserById(userId, user);
  }

  @ApiOperation({
    summary: 'remove user by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiParam({ name: 'userId', type: 'string', description: 'ID of User' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete(DELETE_USER_BY_ID)
  deleteUser(
    @Param('userId', MongoIdPipe) userId: string,
  ): Promise<DeleteUserResponseDto> {
    return this.userService.deleteUserById(userId);
  }
}
