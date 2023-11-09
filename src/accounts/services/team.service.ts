import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateTeamDto,
  CreateTeamResponseDto,
  // DeleteTeamResponseDto,
  GetTeamResponseDto,
  QueryGetTeamsDto,
  UpdateTeamDto,
  UpdateTeamResponseDto,
} from '../dto/team.dto';
import { Team } from '../entities/team.entity';
import { TeamMoveService } from './team-move.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @Inject(TeamMoveService) private teamMoveService: TeamMoveService,
  ) {}

  async getAllTeamsByQuery(
    params?: QueryGetTeamsDto,
  ): Promise<GetTeamResponseDto[]> {
    let teamModelFind = this.teamModel.find();
    const { limit, offset } = params;
    if (limit) {
      teamModelFind = teamModelFind.limit(limit);
    }
    if (offset) {
      teamModelFind = teamModelFind.skip(offset);
    }
    const team = await teamModelFind.exec();
    return team.map((user) => user.toJSON());
  }

  async getTeamById(id: string): Promise<GetTeamResponseDto> {
    const team = await this.teamModel.findById(id).exec();
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team.toJSON();
  }

  async createTeam(team: CreateTeamDto): Promise<CreateTeamResponseDto> {
    const users = team.users;
    const newTeam = new this.teamModel(team);
    const saveTeam = await newTeam.save();
    const teamId = saveTeam._id;
    const createTeamMovePromises = users.map((userId) => {
      return this.teamMoveService.createTeamMove({
        team: teamId,
        user: userId,
        nameTeam: saveTeam.name,
      });
    });
    await Promise.all(createTeamMovePromises);
    return saveTeam.toJSON();
  }

  async updateTeamById(
    id: string,
    team: UpdateTeamDto,
  ): Promise<UpdateTeamResponseDto> {
    const teamOld = await this.getTeamById(id);
    if (team.users) {
      const usersNew = team.users;
      const usersOld = teamOld.users.map((user) => user.toString());
      const createTeamMovePromises = [];
      usersNew.forEach((userIdNew) => {
        const idx = usersOld.findIndex((userIsOld) => userIsOld === userIdNew);
        if (idx >= 0) {
          usersOld.splice(idx, 1);
          return;
        }
        createTeamMovePromises.push(
          this.teamMoveService.createTeamMove({
            team: id,
            user: userIdNew,
            nameTeam: teamOld.name,
          }),
        );
      });

      await Promise.all(createTeamMovePromises);

      const removeTeamMovePromises = usersOld.map((userIdOld) => {
        return this.teamMoveService.endTeamMove(id, userIdOld);
      });

      await Promise.all(removeTeamMovePromises);
    }

    const teamNew = await this.teamModel
      .findByIdAndUpdate(id, { $set: team }, { new: true })
      .exec();
    const saveTeam = await teamNew.save();
    return saveTeam.toJSON();
  }

  /*
  async deleteTeamById(id: string): Promise<DeleteTeamResponseDto> {
    const teamOld = await this.teamModel.findByIdAndRemove(id).exec();
    if (!teamOld) {
      throw new NotFoundException('Team not found');
    }
    return teamOld.toJSON();
  }*/
}
