import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginDto } from '../dto/auths.dto';
import { AuthService } from '../services/auth.service';
import { POST_LOGIN } from '../constants/routes.constant';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(POST_LOGIN)
  login(@Body() loginDTO: LoginDto) {
    return this.authService.loginUser(loginDTO);
  }
}
