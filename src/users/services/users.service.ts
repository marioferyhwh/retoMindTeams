import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { encryptPassword } from 'src/common/utils/auth';
import {
  CreateUserDto,
  CreateUserResponseDto,
  QueryGetUsersDto,
  UpdateUserDto,
} from 'src/users/dto/users.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsersByQuery(params?: QueryGetUsersDto): Promise<User[]> {
    let userModelFind = this.userModel.find().select('-password');
    const { limit, offset } = params;
    if (limit) {
      userModelFind = userModelFind.limit(limit);
    }
    if (offset) {
      userModelFind = userModelFind.skip(offset);
    }
    return await userModelFind.exec();
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<CreateUserResponseDto> {
    //TODO add validation unique email
    const newUSer = new this.userModel(user);
    newUSer.password = await encryptPassword(newUSer.password);
    const saveUser = await newUSer.save();
    return saveUser.toJSON();
  }

  async updateUserById(id: string, user: UpdateUserDto): Promise<User> {
    //TODO validate info
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

  async deleteUserById(id: string) {
    //TODO validate if can delete
    const userOld = await this.userModel.findByIdAndRemove(id).exec();
    if (!userOld) {
      throw new NotFoundException('User not found');
    }
    return userOld;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }
}
