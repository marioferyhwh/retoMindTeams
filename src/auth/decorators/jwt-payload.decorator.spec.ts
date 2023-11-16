import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { JwtUser } from './jwt-payload.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

function getParamDecoratorFactory(decorator: any) {
  class Test {
    public test(@decorator() value) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

describe('JwtUser Decorator', () => {
  const context: any = {
    switchToHttp: jest.fn().mockReturnThis(),
    getClass: jest.fn().mockReturnThis(),
    getHandler: jest.fn().mockReturnThis(),
    getRequest: jest.fn(),
  };
  it('should extract user from request', () => {
    const mockUser = { role: Role.Admin, userId: '1' } as PayloadToken;
    context.getRequest = jest.fn().mockReturnValue({
      user: mockUser,
    });
    const factory = getParamDecoratorFactory(JwtUser);
    const result = factory(null, context);

    expect(result).toBe(mockUser);
  });
});
