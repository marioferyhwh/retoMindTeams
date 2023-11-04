import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { environment } from './enviroments';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      validationSchema: Joi.object({
        MONGO_ROOT_USERNAME: Joi.string().required(),
        MONGO_ROOT_PASSWORD: Joi.string().required(),
        MONGO_DATABASE_NAME: Joi.string().required(),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_HOST: Joi.string().default('localhost'),
        MONGO_CONNECTION: Joi.string().default('mongodb'),
      }),
      isGlobal: true,
    }),
    UsersModule,
    AccountModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
