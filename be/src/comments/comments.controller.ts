import { Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createNewComment(createCommentDto);
  }
  @Get()
  async getComments() {
    return await this.commentsService.getAllComments();
  }
  @Get(':id')
  async getComment(@Param() params: any) {
    return await this.commentsService.getComment(params.id);
  }

  @Delete()
  async deleteComments() {
    return await this.commentsService.deleteAllComments();
  }
}
