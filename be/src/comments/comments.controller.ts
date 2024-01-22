import { Get, Post, Delete, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  @Post()
  async createComment() {
    return 'created';
  }
  @Get()
  async getComments() {
    return 'found';
  }
  @Get(':id')
  async getComment(@Param() params: any) {
    return 'found 1 comment';
  }

  @Delete()
  async deleteComments() {
    return 'deleted';
  }
}
