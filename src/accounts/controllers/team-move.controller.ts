import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { GET_MOV_TEAM } from '../constants/routes.constant';
import {
  GetTeamMoveResponseDto,
  QueryGetTeamMovesDto,
} from '../dto/team-move.dto';
import { TeamMoveService } from '../services/team-move.service';

@ApiTags('Team')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class TeamMoveController {
  constructor(private teamMoveService: TeamMoveService) {}
  @ApiOperation({
    summary: 'list Accounts',
    description: `require (${Role.SuperAdmin}) o (${Role.Admin}).`,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get(GET_MOV_TEAM)
  getAccounts(
    @Query() params: QueryGetTeamMovesDto,
  ): Promise<GetTeamMoveResponseDto[]> {
    return this.teamMoveService.getAllTeamMovesByQuery(params);
  }
}
