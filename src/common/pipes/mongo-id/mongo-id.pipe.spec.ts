import { BadRequestException } from '@nestjs/common';
import { MongoIdPipe } from './mongo-id.pipe';

describe('MongoIdPipe', () => {
  let mongoIdPipe: MongoIdPipe;
  beforeEach(() => {
    mongoIdPipe = new MongoIdPipe();
  });

  it('should be defined', () => {
    expect(mongoIdPipe).toBeDefined();
  });

  describe('transform', () => {
    it('should transform a valid Mongo ID', () => {
      const validMongoId = '5f8a642b9a7c7c1e906f9289';
      const transformedValue = mongoIdPipe.transform(validMongoId);

      expect(transformedValue).toBe(validMongoId);
    });

    it('should throw BadRequestException for an invalid Mongo ID', () => {
      const invalidMongoId = 'invalid_id';

      const transformWithInvalidId = () =>
        mongoIdPipe.transform(invalidMongoId);

      expect(transformWithInvalidId).toThrow(BadRequestException);
      expect(transformWithInvalidId).toThrow(
        `${invalidMongoId} is not mongoId`,
      );
    });
  });
});
