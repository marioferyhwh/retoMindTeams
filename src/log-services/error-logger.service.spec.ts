import { Test, TestingModule } from '@nestjs/testing';

import { ErrorLoggerService } from './error-logger.service';

describe('ErrorLoggerService', () => {
  let errorLoggerService: ErrorLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorLoggerService],
    }).compile();

    errorLoggerService = module.get<ErrorLoggerService>(ErrorLoggerService);
  });

  it('should be defined', () => {
    expect(errorLoggerService).toBeDefined();
  });

  describe('logError', () => {
    it('should log an error', () => {
      const error = 'An error occurred';
      const errorLogger = jest
        .spyOn(errorLoggerService['logger'], 'error')
        .mockImplementation();
      errorLoggerService.logError(error);
      expect(errorLogger).toHaveBeenCalledWith(error);
    });
  });
});
