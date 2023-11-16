import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../common/decorators/trim.decorator';
import { QueryGetPaginateDto } from '../../common/dto/general.dto';

export class QueryGetAccountsDto extends QueryGetPaginateDto {}

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

  @IsMongoId({ message: 'Invalid Team ID' })
  @IsNotEmpty()
  @ApiProperty({ example: '65468668321b83dfe5f6a9fa' })
  team: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}

export class CreateAccountResponseDto extends CreateAccountDto {
  @IsMongoId({ message: 'Invalid Account ID' })
  @IsNotEmpty()
  @ApiProperty({ example: '65468668321b83dfe5f6a9fa' })
  readonly id: string;
}

export class GetAccountResponseDto extends CreateAccountResponseDto {}
export class UpdateAccountResponseDto extends GetAccountResponseDto {}
export class DeleteAccountResponseDto extends GetAccountResponseDto {}
