import {
  Body,
  Controller,
  //Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { MongoIdPipe } from '../../common/pipes/mongo-id/mongo-id.pipe';
import {
  GET_TEAM,
  //DELETE_TEAM_BY_ID,
  GET_TEAM_BY_ID,
  POST_TEAM,
  PUT_TEAM_BY_ID,
} from '../constants/routes.constant';
import {
  CreateTeamDto,
  CreateTeamResponseDto,
  //DeleteTeamResponseDto,
  QueryGetTeamsDto,
  GetTeamResponseDto,
  UpdateTeamDto,
  UpdateTeamResponseDto,
} from '../dto/team.dto';
import { TeamService } from '../services/team.service';

@ApiTags('Team')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiOperation({
    summary: 'create team',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiBody({ type: CreateTeamDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Post(POST_TEAM)
  postTeam(@Body() team: CreateTeamDto): Promise<CreateTeamResponseDto> {
    return this.teamService.createTeam(team);
  }

  @ApiOperation({
    summary: 'list Team',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_TEAM)
  getTeams(@Query() params: QueryGetTeamsDto): Promise<GetTeamResponseDto[]> {
    return this.teamService.getAllTeamsByQuery(params);
  }

  @ApiOperation({
    summary: 'get team by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_TEAM_BY_ID)
  getTeam(
    @Param('teamId', MongoIdPipe) teamId: string,
  ): Promise<GetTeamResponseDto> {
    return this.teamService.getTeamById(teamId);
  }

  @ApiOperation({
    summary: 'update team by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiBody({ type: UpdateTeamDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Put(PUT_TEAM_BY_ID)
  putTeam(
    @Param('teamId', MongoIdPipe) teamId: string,
    @Body() team: UpdateTeamDto,
  ): Promise<UpdateTeamResponseDto> {
    return this.teamService.updateTeamById(teamId, team);
  }

  /*
  @ApiOperation({
    summary: 'remove team by id',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete(DELETE_TEAM_BY_ID)
  deleteTeam(
    @Param('teamId', MongoIdPipe) teamId: string,
  ): Promise<DeleteTeamResponseDto> {
    return this.teamService.deleteTeamById(teamId);
  }*/
}
