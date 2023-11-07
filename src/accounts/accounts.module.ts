import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { AccountsController } from './controllers/accounts.controller';
import { TeamMoveController } from './controllers/team-move.controller';
import { TeamController } from './controllers/team.controller';
import { Account, AccountSchema } from './entities/account.entity';
import { TeamMove, TeamMoveSchema } from './entities/team-move.entity';
import { Team, TeamSchema } from './entities/team.entity';
import { AccountsService } from './services/accounts.service';
import { TeamMoveService } from './services/team-move.service';
import { TeamService } from './services/team.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: Team.name,
        schema: TeamSchema,
      },
      {
        name: TeamMove.name,
        schema: TeamMoveSchema,
      },
    ]),
  ],
  controllers: [TeamMoveController, TeamController, AccountsController],
  providers: [TeamMoveService, TeamService, AccountsService],
})
export class AccountsModule {}
