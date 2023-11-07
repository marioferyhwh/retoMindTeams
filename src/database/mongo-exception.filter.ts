3;

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';
import * as mongoose from 'mongoose';
import { ErrorLoggerService } from 'src/log-services/error-logger.service';

@Catch(mongoose.mongo.MongoServerError)
export class MongoExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly errorLoggerService: ErrorLoggerService) {
    super();
  }

  catch(exception: mongoose.mongo.MongoServerError, host: ArgumentsHost) {
    this.errorLoggerService.logError(exception);
    const response = host.switchToHttp().getResponse();

    if (exception.code === 11000) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `Duplicate unique key '${Object.keys(exception.keyValue)}'`,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'MongoDB internal error.',
      });
    }
  }
}
