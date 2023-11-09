import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from '../../auth/models/token.model';
import { encryptPassword } from '../../common/utils/auth';
import {
  CreateUserDto,
  CreateUserResponseDto,
  DeleteUserResponseDto,
  GetUserResponseDto,
  QueryGetUsersDto,
  UpdateUserDto,
  UpdateUserResponseDto,
} from '../dto/users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsersByQuery(
    params?: QueryGetUsersDto,
  ): Promise<GetUserResponseDto[]> {
    let userModelFind = this.userModel.find().select('-password');
    const { limit, offset } = params;
    if (limit) {
      userModelFind = userModelFind.limit(limit);
    }
    if (offset) {
      userModelFind = userModelFind.skip(offset);
    }
    const users = await userModelFind.exec();
    return users.map((user) => user.toJSON());
  }

  isUnauthorizedToEditOrSeeUser(jwtUser: PayloadToken, id: string) {
    return jwtUser.role == Role.User && jwtUser.userId != id;
  }
  isUnauthorizedToCreateUserWithRole(jwtUserRole: Role, userRole: Role) {
    return (
      jwtUserRole == Role.User ||
      (jwtUserRole == Role.Admin && userRole != Role.User)
    );
  }

  async getUserById(
    jwtUser: PayloadToken,
    id: string,
  ): Promise<GetUserResponseDto> {
    if (this.isUnauthorizedToEditOrSeeUser(jwtUser, id)) {
      throw new UnauthorizedException(
        `Unauthorized: You do not have permission to view a user different from '${jwtUser.userId}'.`,
      );
    }
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toJSON();
  }

  async createUser(
    jwtUser: PayloadToken,
    user: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    if (!user.role) {
      user.role = Role.User;
    }
    if (this.isUnauthorizedToCreateUserWithRole(jwtUser.role, user.role)) {
      throw new UnauthorizedException(
        `Unauthorized: The user does not have permission to create a user with the role '${user.role}'.`,
      );
    }
    user = { ...user, password: await encryptPassword(user.password) };
    const saveUser = await this.userModel.create(user);
    return saveUser.toJSON();
  }

  async updateUserById(
    jwtUser: PayloadToken,
    id: string,
    user: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    if (this.isUnauthorizedToEditOrSeeUser(jwtUser, id)) {
      throw new UnauthorizedException(
        `Unauthorized: You do not have permission to edit a user different from '${jwtUser.userId}'.`,
      );
    }
    if (
      user.role &&
      this.isUnauthorizedToCreateUserWithRole(jwtUser.role, user.role)
    ) {
      throw new UnauthorizedException(
        `Unauthorized: The user does not have permission to update user to role '${user.role}'.`,
      );
    }
    if (user.password) {
      user = { ...user, password: await encryptPassword(user.password) };
    }
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, { $set: user }, { new: true })
      .exec();
    if (!updateUser) {
      throw new NotFoundException('User not found');
    }
    const saveUser = await updateUser.save();
    return saveUser.toJSON();
  }

  async deleteUserById(
    jwtUser: PayloadToken,
    id: string,
  ): Promise<DeleteUserResponseDto> {
    if (jwtUser.userId == id) {
      throw new UnauthorizedException(
        `Unauthorized: You do not have permission to delete your own user account.`,
      );
    }
    const userOld = await this.userModel.findByIdAndRemove(id).exec();
    if (!userOld) {
      throw new NotFoundException('User not found');
    }
    return userOld.toJSON();
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }
}
