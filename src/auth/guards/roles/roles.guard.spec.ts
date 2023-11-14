import { UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../models/roles.model';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });
  afterEach(() => {
    jest.clearAllMocks;
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  describe('canActivate', () => {
    const context: any = {
      switchToHttp: jest.fn().mockReturnThis(),
      getClass: jest.fn().mockReturnThis(),
      getHandler: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        user: { role: Role.User },
      }),
    };
    it('not role', () => {
      const refactorGetSpy = jest.spyOn(reflector, 'get');
      refactorGetSpy.mockReturnValue(null);

      expect(rolesGuard.canActivate(context)).toBeDefined();
    });

    it('correct role', () => {
      const refactorGetSpy = jest.spyOn(reflector, 'get');
      refactorGetSpy.mockReturnValue([Role.Admin, Role.SuperAdmin]);
      context.getRequest = jest.fn().mockReturnValue({
        user: { role: Role.Admin },
      });

      const response = rolesGuard.canActivate(context);

      expect(response).toBeTruthy();
    });

    it('not correct role', () => {
      const refactorGetSpy = jest.spyOn(reflector, 'get');
      refactorGetSpy.mockReturnValue([Role.Admin, Role.SuperAdmin]);
      context.getRequest = jest.fn().mockReturnValue({
        user: { role: Role.User },
      });

      expect(() => rolesGuard.canActivate(context)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
