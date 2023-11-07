import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class QueryGetTeamMovesDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ example: '10' })
  limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ example: '0' })
  offset?: number;

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
}

export class CreateTeamMoveDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'dasfasfas123123123f' })
  team: string;

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

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'mateo',
    type: String,
  })
  nameUser?: string;
}
export class CreateTeamMoveResponseDto {}

export class GetTeamMoveResponseDto extends CreateTeamMoveResponseDto {}
export class UpdateTeamMoveResponseDto extends GetTeamMoveResponseDto {}
export class DeleteTeamMoveResponseDto extends GetTeamMoveResponseDto {}
