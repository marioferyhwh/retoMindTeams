// jwt-payload.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadToken } from '../models/token.model';

export const JwtUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): PayloadToken => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
