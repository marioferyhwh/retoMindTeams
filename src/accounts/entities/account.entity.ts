import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Team } from './team.entity';

@Schema({
  toJSON: {
    transform: (_document, returnObject) => {
      returnObject.id = returnObject._id.toString();
      delete returnObject.__v;
      delete returnObject._id;
    },
  },
})
export class Account extends Document {
  @Prop({ required: true, unique: true })
  nameAccount: string;
  @Prop({ required: true })
  nameClient: string;
  @Prop({ required: true })
  nameCharge: string;
  @Prop({ required: true, type: Types.ObjectId, ref: Team.name })
  team: Team | Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
