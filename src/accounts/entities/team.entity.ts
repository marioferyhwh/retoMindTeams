import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema({
  toJSON: {
    transform: (_document, returnObject) => {
      returnObject.id = returnObject._id;
      delete returnObject.__v;
      delete returnObject._id;
    },
  },
})
export class Team extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: User.name }] })
  users: Types.Array<User> | Types.Array<string>;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
