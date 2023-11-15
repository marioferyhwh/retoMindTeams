import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import config from '../../config';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
        JwtModule.register({
          secret: 'authConstants.jwt.secret',
          signOptions: { expiresIn: '30s' },
        }),
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate', () => {
    const payload: PayloadToken = { role: Role.Admin, userId: '' };
    const response = jwtStrategy.validate(payload);
    expect(response).toEqual(payload);
  });
});
