import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class DtoValidator {
  static async createAndValidateDto<T extends object>(
    dtoClass: new () => T,
    data: any,
  ): Promise<T> {
    const dtoInstance = plainToClass(dtoClass, data);
    await validateOrReject(dtoInstance, {
      whitelist: true,
    });
    return dtoInstance;
  }
}
