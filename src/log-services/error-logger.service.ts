import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ErrorLoggerService {
  private logger = new Logger('ErrorLogger');

  logError(error: any) {
    this.logger.error(error);
  }
}
