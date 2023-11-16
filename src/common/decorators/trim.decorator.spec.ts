import { Trim } from './trim.decorator';
import { plainToClass } from 'class-transformer';

describe('Trim Decorator', () => {
  it('should trim the string value', () => {
    class TestClass {
      @Trim()
      value: string;
    }
    const instance = new TestClass();
    instance.value = '   example   ';
    const transformedInstance = plainToClass(TestClass, instance);
    expect(transformedInstance.value).toEqual('example');
  });

  it('should not trim non-string values', () => {
    class TestClass {
      @Trim()
      value: number;
    }

    const instance = new TestClass();
    instance.value = 42;

    const transformedInstance = plainToClass(TestClass, instance);
    expect(transformedInstance.value).toEqual(42);
  });
});
