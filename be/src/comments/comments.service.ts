import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createNewComment(createCommentDto: CreateCommentDto) {
    try {
      createCommentDto.createdAt = new Date();
      return this.commentModel.create(createCommentDto);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add comment');
    }
  }

  async getAllComments() {
    try {
      return await this.commentModel.find().sort({ createdAt: -1 }).exec();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch comments');
    }
  }
  async getComment(id: string) {
    try {
      return await this.commentModel.find({ _id: id }).exec();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch comment');
    }
  }
  async deleteAllComments() {
    try {
      return await this.commentModel.deleteMany({});
    } catch (err) {
      console.log(err);
      throw new Error('Failed to delete comments');
    }
  }
}
