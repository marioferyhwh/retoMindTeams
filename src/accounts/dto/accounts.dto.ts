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
