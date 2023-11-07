import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

import { Role } from '../../auth/models/roles.model';
import { Trim } from '../../common/decorators/trim.decorator';
import { IsValidPassword } from '../../common/decorators/valid-password.decorator';
import { EnglishLevel } from '../entities/user.entity';

export class QueryGetUsersDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ example: '10' })
  limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ example: '0' })
  offset?: number;
}

export class CreateUserDto {
  @Trim()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'name@email.com' })
  readonly email: string;

  @Trim()
  @IsValidPassword()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123aweAWE' })
  readonly password: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  readonly name: string;

  @ApiProperty({
    enum: [Role.Admin, Role.User],
    example: Role.User,
  })
  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {
  @IsOptional()
  @IsEnum(EnglishLevel)
  @ApiProperty({ enum: EnglishLevel, example: EnglishLevel.A2 })
  readonly englishLevel?: EnglishLevel;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'node, react' })
  readonly technicalKnowledge?: string;

  @Trim()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'www.google.com' })
  readonly urlCv?: string;
}

export class CreateUserResponseDto extends OmitType(CreateUserDto, [
  'password',
]) {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  id: string;

  @ApiProperty({
    enum: Role,
    example: Role.User,
  })
  @IsEnum(Role)
  role: Role;
}

export class GetUserResponseDto extends CreateUserResponseDto {
  @IsOptional()
  @IsEnum(EnglishLevel)
  @ApiProperty({ enum: EnglishLevel, example: EnglishLevel.A2 })
  englishLevel?: EnglishLevel;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'node, react' })
  technicalKnowledge?: string;

  @Trim()
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'www.google.com' })
  urlCv?: string;
}

export class UpdateUserResponseDto extends GetUserResponseDto {}
export class DeleteUserResponseDto extends GetUserResponseDto {}
