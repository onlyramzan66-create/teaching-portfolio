import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('post/:slug')
  listByPostSlug(
    @Param('slug') slug: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const parsedPage = Number(page ?? 1);
    const parsedLimit = Number(limit ?? 20);
    return this.commentsService.listByPostSlug(
      slug,
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 20,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('post/:slug')
  createByPostSlug(
    @Param('slug') slug: string,
    @Req() req: { user: { id: number; email: string; name?: string } },
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.createForPostSlug(slug, req.user, dto);
  }
}
