import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

import { Trim } from '../../common/decorators/trim.decorator';

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
  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'cliente1-1' })
  readonly nameAccount: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'cidenet' })
  readonly nameClient: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'luis' })
  readonly nameCharge: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  team: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export class CreateAccountResponseDto extends CreateAccountDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  readonly id: string;
}

export class GetAccountResponseDto extends CreateAccountResponseDto {}
export class UpdateAccountResponseDto extends GetAccountResponseDto {}
export class DeleteAccountResponseDto extends GetAccountResponseDto {}
