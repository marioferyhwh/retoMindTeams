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
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    it('should catch and handle a MongoDB duplicate key error', () => {
      const exception = new mongoose.mongo.MongoServerError({
        message: 'Duplicate key error',
      });
      exception.code = 11000;
      exception.keyValue = { username: 'john_doe' };
      const errorLoggerSpy = jest.spyOn(errorLoggerService, 'logError');
      const statusSpy = jest.spyOn(host, 'status').mockReturnThis();
      const jsonSpy = jest.spyOn(host, 'json');

      mongoExceptionFilter.catch(exception, host);

      expect(errorLoggerSpy).toHaveBeenCalledWith(exception);
      expect(statusSpy).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(jsonSpy).toHaveBeenCalledWith({
        statusCode: HttpStatus.CONFLICT,
        message: `Duplicate unique key '${Object.keys(exception.keyValue)}'`,
      });
    });

    it('should catch and handle a MongoDB internal error', () => {
      const exception = new mongoose.mongo.MongoServerError({
        message: 'MongoDB internal error',
      });

      const errorLoggerSpy = jest.spyOn(errorLoggerService, 'logError');
      const statusSpy = jest.spyOn(host, 'status').mockReturnThis();
      const jsonSpy = jest.spyOn(host, 'json');

      mongoExceptionFilter.catch(exception, host);

      expect(errorLoggerSpy).toHaveBeenCalledWith(exception);

      expect(statusSpy).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(jsonSpy).toHaveBeenCalledWith({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'MongoDB internal error.',
      });
    });
  });
});
