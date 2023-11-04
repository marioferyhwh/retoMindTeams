import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import config from '../config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { SECRET } = configService.JWT;
        return { secret: SECRET, signOptions: { expiresIn: '10m' } };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
