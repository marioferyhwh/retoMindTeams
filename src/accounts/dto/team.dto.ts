import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class QueryGetTeamsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ example: '10' })
  limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ example: '0' })
  offset?: number;
}

export class CreateTeamDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'team1' })
  readonly name: string;

  @IsArray()
  @ApiProperty({ example: '["654b9b72056956fe4a4d82f3"]' })
  readonly users: string[];
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class CreateTeamResponseDto extends CreateTeamDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  readonly id: string;
}

export class GetTeamResponseDto extends CreateTeamResponseDto {}
export class UpdateTeamResponseDto extends GetTeamResponseDto {}
export class DeleteTeamResponseDto extends GetTeamResponseDto {}
