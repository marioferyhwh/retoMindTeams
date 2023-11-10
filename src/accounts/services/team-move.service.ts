import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Role } from '../../auth/models/roles.model';
import { UsersService } from '../../users/services/users.service';
import {
  CreateTeamMoveDto,
  CreateTeamMoveResponseDto,
  GetTeamMoveResponseDto,
  QueryGetTeamMovesDto,
  UpdateTeamMoveDto,
  UpdateTeamMoveResponseDto,
} from '../dto/team-move.dto';
import { TeamMove } from '../entities/team-move.entity';

@Injectable()
export class TeamMoveService {
  constructor(
    @InjectModel(TeamMove.name) private teamMoveModel: Model<TeamMove>,
    @Inject(UsersService) private userService: UsersService,
  ) {}

  async getAllTeamMovesByQuery(
    params?: QueryGetTeamMovesDto,
  ): Promise<GetTeamMoveResponseDto[]> {
    const {
      limit,
      offset,
      nameUser,
      team,
      nameTeam,
      endDate,
      startDate,
      activated,
    } = params;

    const filters: FilterQuery<TeamMove> = {};

    if (nameUser) {
      filters.nameUser = { $regex: new RegExp(nameUser, 'i') };
    }
    if (nameTeam) {
      filters.nameTeam = { $regex: new RegExp(nameTeam, 'i') };
    }
    if (team) {
      filters.team = team;
    }
    if (startDate) {
      filters.startDate = { $gt: new Date(startDate) };
    }
    if (endDate) {
      filters.endDate = { $lte: new Date(endDate) };
    }
    if (activated !== undefined) {
      filters.activated = activated;
    }

    let teamModelModelFind = this.teamMoveModel.find(filters);
    if (limit) {
      teamModelModelFind = teamModelModelFind.limit(limit);
    }
    if (offset) {
      teamModelModelFind = teamModelModelFind.skip(offset);
    }
    const teamModel = await teamModelModelFind.exec();
    return teamModel.map((user) => user.toJSON());
  }

  async createTeamMove(
    teamModel: CreateTeamMoveDto,
  ): Promise<CreateTeamMoveResponseDto> {
    if (!teamModel.startDate) {
      teamModel.startDate = new Date();
    }
    const endDate = new Date(teamModel.startDate);
    endDate.setFullYear(endDate.getFullYear() + 100);
    const user = await this.userService.getUserById(
      { role: Role.Admin, userId: '' },
      teamModel.user,
    );
    teamModel.user = teamModel.user.toString();
    teamModel.team = teamModel.team.toString();
    const saveTeamMove = await this.teamMoveModel.create({
      ...teamModel,
      nameUser: user.name,
      endDate: endDate,
    });
    return saveTeamMove.toJSON();
  }

  async updateTeamMove(
    id: string,
    teamModel: UpdateTeamMoveDto,
  ): Promise<UpdateTeamMoveResponseDto> {
    const teamNew = await this.teamMoveModel
      .findByIdAndUpdate(id, { $set: teamModel }, { new: true })
      .exec();
    if (!teamNew) {
      throw new NotFoundException('Team not found');
    }
    const saveTeamMove = await teamNew.save();
    return saveTeamMove.toJSON();
  }

  async endTeamMove(teamId: string, userId: string): Promise<void> {
    const filters = {
      team: teamId,
      user: userId,
      activated: true,
    };

    const teamMove = await this.teamMoveModel.findOne(filters).exec();

    teamMove.endDate = new Date();
    teamMove.activated = false;
    await teamMove.save();
  }
}
