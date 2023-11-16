import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QueryGetPaginateDto } from '../../common/dto/general.dto';

export class QueryGetTeamMovesDto extends QueryGetPaginateDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    example: 'dasfasfas123123123f',
    type: String,
  })
  team?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'mateo',
    type: String,
  })
  nameUser?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'team1',
    type: String,
  })
  nameTeam?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2023-11-15',
    description: 'Date of initiation or a range of dates (yyyy-mm-dd)',
    type: Date,
  })
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2023-11-16',
    description: 'Date of completion or a range of dates (yyyy-mm-dd)',
    type: Date,
  })
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  @ApiProperty({
    example: 'true',
    type: Boolean,
  })
  activated?: boolean;
}

export class CreateTeamMoveDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'dasfasfas123123123f' })
  team: string;

  @IsString()
  @ApiProperty({
    example: 'team1',
    type: String,
  })
  nameTeam: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'dasfasfas123123123f', type: String })
  user: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2023-11-15',
    description: 'Date of initiation or a range of dates (yyyy-mm-dd)',
    type: Date,
  })
  startDate?: Date;
}

export class UpdateTeamMoveDto {
  @IsOptional()
  @IsDate()
  @ApiProperty({
    example: '2023-11-16',
    description: 'Date of completion or a range of dates (yyyy-mm-dd)',
    type: Date,
  })
  endDate?: Date;
}
export class CreateTeamMoveResponseDto extends CreateTeamMoveDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: 'dasfasfas123123123f' })
  readonly id: string;

  @IsDate()
  @ApiProperty({
    example: '2023-11-16',
    description: 'Date of completion or a range of dates (yyyy-mm-dd)',
    type: Date,
  })
  endDate?: Date;
}

export class GetTeamMoveResponseDto extends CreateTeamMoveResponseDto {}
export class UpdateTeamMoveResponseDto extends GetTeamMoveResponseDto {}
export class DeleteTeamMoveResponseDto extends GetTeamMoveResponseDto {}
