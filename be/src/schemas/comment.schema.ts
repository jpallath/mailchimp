import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  name: string;

  @Prop()
  message: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
