import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { encryptPassword } from '../../common/utils/auth';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/auths.dto';
import { Role } from '../models/roles.model';
import { AuthService } from './auth.service';

const loginUserDto: LoginDto = { email: 'email.com', password: '123' };

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('token') },
        },
        {
          provide: UsersService,
          useValue: { getUserByEmail: jest.fn() },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should login user and return token', async () => {
    const user: any = {
      id: '65468668321b83dfe5f6a9fa',
      name: 'user',
      email: 'user@email.com',
      password: await encryptPassword(loginUserDto.password),
      role: Role.Admin,
    };
    const userResponse = { ...user, toJSON: jest.fn().mockReturnValue(user) };

    jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(userResponse);

    const response = await authService.loginUser(loginUserDto);

    expect(response).toBeDefined();
    expect(response.access_token).toBeDefined();
    expect(typeof response.access_token).toBe('string');
    expect(response.user).toBeDefined();
    expect(typeof response.user).toBe('object');
  });

  it('should not login user and return null', async () => {
    jest.spyOn(usersService, 'getUserByEmail').mockResolvedValue(null);

    const loginResult = authService.loginUser(loginUserDto);

    await expect(loginResult).rejects.toThrow(UnauthorizedException);
  });
});
