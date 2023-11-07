import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Team } from './team.entity';
import { User } from 'src/users/entities/user.entity';

@Schema({
  toJSON: {
    transform: (_document, returnObject) => {
      returnObject.id = returnObject._id;
      delete returnObject.__v;
      delete returnObject._id;
    },
  },
})
export class TeamMove extends Document {
  @Prop({ required: true })
  startDate: Date;
  @Prop({ required: true })
  endDate: Date;
  @Prop({ required: true, type: Types.ObjectId, ref: Team.name })
  team: Team | Types.ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;
  @Prop({ required: true })
  nameUser: string;
  @Prop({ default: true })
  activated: boolean;
}

export const TeamMoveSchema = SchemaFactory.createForClass(TeamMove);
