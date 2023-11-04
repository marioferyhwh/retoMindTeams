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

import { EnglishLevel, UserRole } from 'src/users/entities/user.entity';

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
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'name@email.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123aweAWE' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  readonly name: string;

  @ApiProperty({
    enum: [UserRole.Admin, UserRole.User],
    example: UserRole.User,
  })
  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {
  @IsOptional()
  @IsEnum(EnglishLevel)
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

export class CreateUserResponseDto extends OmitType(CreateUserDto, [
  'password',
]) {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  readonly id: string;
}
