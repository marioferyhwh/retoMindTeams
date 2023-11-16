import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';
import { QueryGetPaginateDto } from '../../common/dto/general.dto';

export class QueryGetTeamsDto extends QueryGetPaginateDto {}

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
  @IsMongoId({ message: 'Invalid Team ID' })
  @IsNotEmpty()
  @ApiProperty({ example: '65468668321b83dfe5f6a9fa' })
  readonly id: string;
}

export class GetTeamResponseDto extends CreateTeamResponseDto {}
export class UpdateTeamResponseDto extends GetTeamResponseDto {}
export class DeleteTeamResponseDto extends GetTeamResponseDto {}
