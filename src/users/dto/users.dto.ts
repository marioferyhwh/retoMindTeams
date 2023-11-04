import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { EnglishLevel, UserRole } from 'src/users/entities/user.entity';

export class QueryGetUserDto {}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'name@email.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123aweAWE' })
  readonly password: string;

  @ApiProperty({
    enum: [UserRole.Admin, UserRole.User],
    example: UserRole.User,
  })
  role: UserRole;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'name' })
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: '123aweAWE' })
  readonly password?: string;

  @ApiProperty({
    enum: [UserRole.Admin, UserRole.User],
    example: UserRole.User,
  })
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ enum: EnglishLevel, example: EnglishLevel.A2 })
  readonly englishLevel?: EnglishLevel;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'node, react' })
  readonly technicalKnowledge?: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'www.google.com' })
  readonly urlCv?: string;
}
