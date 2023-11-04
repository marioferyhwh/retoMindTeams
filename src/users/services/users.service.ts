import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateUserDto,
  QueryGetUserDto,
  UpdateUserDto,
} from 'src/users/dto/users.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsersByQuery(params: QueryGetUserDto): Promise<User[]> {
    console.log(params);
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  createUser(user: CreateUserDto): any {
    //TODO add validation unique email
    const newUSer = new this.userModel(user);
    return newUSer.save();
  }

  async updateUserById(id: string, user: UpdateUserDto) {
    //TODO validate info
    const userNew = await this.userModel
      .findByIdAndUpdate(id, { $set: user }, { new: true })
      .exec();
    if (!userNew) {
      throw new NotFoundException('User not found');
    }
    return userNew.save();
  }

  async deleteUserById(id: string) {
    //TODO validate if can delete
    const userOld = await this.userModel.findByIdAndRemove(id).exec();
    if (!userOld) {
      throw new NotFoundException('User not found');
    }
    return userOld;
  }
}
