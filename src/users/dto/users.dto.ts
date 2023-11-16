import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { Role } from '../../auth/models/roles.model';
import { Trim } from '../../common/decorators/trim.decorator';
import { IsValidPassword } from '../../common/decorators/valid-password.decorator';
import { QueryGetPaginateDto } from '../../common/dto/general.dto';
import { EnglishLevel } from '../entities/user.entity';

export class QueryGetUsersDto extends QueryGetPaginateDto {}

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
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
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
  @IsMongoId({ message: 'Invalid user ID' })
  @IsNotEmpty()
  @ApiProperty({ example: '65468668321b83dfe5f6a9fa' })
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

export class GetProfileResponseDto extends GetUserResponseDto {}

export class UpdateProfileDto extends PartialType(
  OmitType(GetProfileResponseDto, ['role', 'email', 'id']),
) {
  @Trim()
  @IsValidPassword()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: '123aweAWE', required: false })
  readonly password: string;
}
export class UpdateProfileResponseDto extends GetProfileResponseDto {}
