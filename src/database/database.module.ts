import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          CONNECTION,
          ROOT_USERNAME,
          ROOT_PASSWORD,
          HOST,
          PORT,
          DATABASE_NAME,
        } = configService.MONGO;
        return {
          uri: `${CONNECTION}://${HOST}:${PORT}`,
          user: ROOT_USERNAME,
          pass: ROOT_PASSWORD,
          dbName: DATABASE_NAME,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
