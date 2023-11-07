import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    MONGO: {
      DATABASE_NAME: process.env.MONGO_DATABASE_NAME,
      ROOT_USERNAME: process.env.MONGO_ROOT_USERNAME,
      ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD,
      PORT: parseInt(process.env.MONGO_PORT, 10),
      HOST: process.env.MONGO_HOST,
      CONNECTION: process.env.MONGO_CONNECTION,
    },
    JWT: {
      SECRET: process.env.JWT_SECRET_KEY,
      DURATION: process.env.JWT_TOKEN_DURATION,
    },
  };
});
