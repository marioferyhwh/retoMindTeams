import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from '../../common/utils/auth';
import { GetUserResponseDto } from '../../users/dto/users.dto';
import { UsersService } from '../../users/services/users.service';
import { LoginDto, LoginResponseDto } from '../dto/auths.dto';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<GetUserResponseDto> {
    const userFind = await this.usersService.getUserByEmail(email);

    if (userFind) {
      const isPasswordCorrect = await comparePassword(
        password,
        userFind.password,
      );
      if (isPasswordCorrect) {
        return userFind.toJSON();
      }
    }
    return null;
  }

  async generateJWT(user: GetUserResponseDto): Promise<LoginResponseDto> {
    const payload: PayloadToken = { role: user.role, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async loginUser(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.getUserByEmailAndPassword(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('not allow');
    }

    return await this.generateJWT(user);
  }
}
