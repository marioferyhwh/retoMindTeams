import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class QueryGetAccountsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ example: '10' })
  limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ example: '0' })
  offset?: number;
}

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name' })
  readonly nameAccount: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'cidenet' })
  readonly nameClient: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'luis' })
  readonly nameCharge: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export class CreateAccountResponseDto extends CreateAccountDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  readonly id: string;
}
