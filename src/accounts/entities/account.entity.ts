import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ required: true, unique: true })
  nameAccount: string;
  @Prop({ required: true })
  nameClient: string;
  @Prop({ required: true })
  nameCharge: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
