import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    //
    console.log({ context });
    if (false) {
      return false;
    }
    return super.canActivate(context);
  }
}
