import { HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import configuration from '../config';
import { ErrorLoggerService } from '../log-services/error-logger.service';
import { MongoExceptionFilter } from './mongo-exception.filter';
describe('MongoExceptionFilter', () => {
  let mongoExceptionFilter: MongoExceptionFilter;

  let errorLoggerService: ErrorLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
      ],
      providers: [MongoExceptionFilter, ErrorLoggerService],
    }).compile();

    mongoExceptionFilter =
      module.get<MongoExceptionFilter>(MongoExceptionFilter);
    errorLoggerService = module.get<ErrorLoggerService>(ErrorLoggerService);
  });

  it('should be defined', () => {
    expect(mongoExceptionFilter).toBeDefined();
  });

  describe('catch', () => {
    const host = {
      switchToHttp: () => ({
        getResponse: () => ({
          status: jest.fn(),
          json: jest.fn(),
        }),
      }),
    } as any;

    it('should catch and handle a MongoDB duplicate key error', () => {
      const exception = new mongoose.mongo.MongoServerError({
        message: 'Duplicate key error',
      });
      exception.code = 11000;
      exception.keyValue = { username: 'john_doe' };

      const errorLoggerSpy = jest.spyOn(errorLoggerService, 'logError');

      mongoExceptionFilter.catch(exception, host);

      expect(errorLoggerSpy).toHaveBeenCalledWith(exception);

      const response = host.switchToHttp().getResponse();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(response.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.CONFLICT,
        message: `Duplicate unique key '${Object.keys(exception.keyValue)}'`,
      });
    });

    it('should catch and handle a MongoDB internal error', () => {
      const exception = new mongoose.mongo.MongoServerError({
        message: 'MongoDB internal error',
      });

      const errorLoggerSpy = jest.spyOn(errorLoggerService, 'logError');

      mongoExceptionFilter.catch(exception, host);

      expect(errorLoggerSpy).toHaveBeenCalledWith(exception);

      const response = host.switchToHttp().getResponse();
      expect(response.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(response.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'MongoDB internal error.',
      });
    });
  });
});
