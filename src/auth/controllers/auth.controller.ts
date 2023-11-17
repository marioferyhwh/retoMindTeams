import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { POST_LOGIN } from '../constants/routes.constant';
import { LoginDto, LoginResponseDto } from '../dto/auths.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
    description: ``,
  })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'login user successful',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post(POST_LOGIN)
  login(@Body() loginDTO: LoginDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(loginDTO);
  }
}
