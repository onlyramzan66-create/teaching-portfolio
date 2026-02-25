import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { buildFileUrl, imageUploadOptions } from '../common/upload';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  listPublished(
    @Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('q') q?: string,
  ) {
    const parsedLimit = Number(limit ?? 9);
    const parsedPage = Number(page ?? 1);
    return this.postsService.listPublished(
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 9,
      q ?? '',
    );
  }

  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.postsService.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/all')
  listAll(@Query('limit') limit?: string) {
    const parsedLimit = Number(limit ?? 100);
    return this.postsService.listAll(Number.isFinite(parsedLimit) ? parsedLimit : 100);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/upload-image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', imageUploadOptions))
  uploadImage(
    @Req() req: { protocol: string; get: (header: string) => string },
    @UploadedFile() file?: { filename: string },
  ) {
    if (!file?.filename) {
      return { message: 'No file uploaded' };
    }

    return {
      url: buildFileUrl(req, file.filename),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
