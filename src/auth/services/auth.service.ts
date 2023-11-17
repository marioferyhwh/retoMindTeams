import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from '../../common/utils/auth';
import { DtoValidator } from '../../common/utils/dto-validator.util';
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
        return DtoValidator.createAndValidateDto(
          GetUserResponseDto,
          userFind.toJSON(),
        );
      }
    }
    return null;
  }

  async generateJWT(user: GetUserResponseDto): Promise<string> {
    const payload: PayloadToken = { role: user.role, userId: user.id };
    return this.jwtService.sign(payload);
  }

  async loginUser(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.getUserByEmailAndPassword(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    const accessToken = await this.generateJWT(user);

    return {
      access_token: accessToken,
      user,
    };
  }
}
