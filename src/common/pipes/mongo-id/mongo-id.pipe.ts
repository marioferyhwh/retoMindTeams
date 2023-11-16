import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string /*, metadata: ArgumentMetadata*/) {
    if (!isMongoId(value)) {
      throw new NotFoundException(`${value} not found`);
    }
    return value;
  }
}
