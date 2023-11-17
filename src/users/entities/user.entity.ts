import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Role } from '../../auth/models/roles.model';

export enum EnglishLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

@Schema({
  toJSON: {
    transform: (_document, returnObject) => {
      returnObject.id = returnObject._id.toString();
      delete returnObject.__v;
      delete returnObject._id;
      delete returnObject.password;
    },
  },
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role })
  role: Role;

  @Prop({ required: false })
  englishLevel?: EnglishLevel;

  @Prop({ required: false })
  technicalKnowledge?: string;

  @Prop({ required: false })
  urlCv?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
