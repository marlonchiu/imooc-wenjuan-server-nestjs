import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({
  timestamps: true, // 记录时间戳 crateAt & updateAt
})
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop()
  desc: string;

  // 其他待补充
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
