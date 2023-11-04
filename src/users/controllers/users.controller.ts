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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/models/roles.model';
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
  CreateUserResponseDto,
  QueryGetUsersDto,
  UpdateUserDto,
} from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/services/users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post(POST_USER)
  @Roles(Role.SuperAdmin, Role.Admin)
  @ApiOperation({
    summary: 'create user',
  })
  postUser(@Body() user: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(user);
  }

  @Get(GET_USER)
  @Roles(Role.SuperAdmin, Role.Admin)
  @ApiOperation({ summary: 'list Users' })
  getUsers(@Query() params: QueryGetUsersDto) {
    return this.userService.getAllUsersByQuery(params);
  }

  @Get(GET_USER_BY_ID)
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @ApiOperation({ summary: 'get user by id' })
  getUser(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.getUserById(userId);
  }

  @Put(PUT_USER_BY_ID)
  @Roles(Role.SuperAdmin, Role.Admin, Role.User)
  @ApiOperation({ summary: 'update user by id' })
  putUser(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUserById(userId, user);
  }

  @Delete(DELETE_USER_BY_ID)
  @Roles(Role.SuperAdmin, Role.Admin)
  @ApiOperation({ summary: 'remove user by id' })
  deleteUser(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.deleteUserById(userId);
  }
}
