import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../dto/auths.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDTO: LoginDto) {
    return this.authService.loginUser(loginDTO);
  }
}
