import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'name@email.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123aweAWE' })
  readonly password: string;
}
