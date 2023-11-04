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

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
  DELETE_USER_BY_ID,
  GET_USER,
  GET_USER_BY_ID,
  POST_USER,
  PUT_USER_BY_ID,
} from 'src/users/constants/routes.constant';
import {
  CreateUserDto,
  QueryGetUserDto,
  UpdateUserDto,
} from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/services/users.service';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post(POST_USER)
  @ApiOperation({
    summary: 'create user',
  })
  postUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get(GET_USER)
  @ApiOperation({ summary: 'list Users' })
  getUsers(@Query() params: QueryGetUserDto) {
    return this.userService.getAllUsersByQuery(params);
  }

  @Get(GET_USER_BY_ID)
  @ApiOperation({ summary: 'get user by id' })
  getUser(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.getUserById(userId);
  }

  @Put(PUT_USER_BY_ID)
  @ApiOperation({ summary: 'update user by id' })
  putUser(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUserById(userId, user);
  }

  @Delete(DELETE_USER_BY_ID)
  @ApiOperation({ summary: 'remove user by id' })
  deleteUser(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.deleteUserById(userId);
  }
}
