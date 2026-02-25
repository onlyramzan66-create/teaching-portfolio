import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { buildFileUrl, imageUploadOptions } from '../common/upload';
import { UserRole } from '../users/entities/user.entity';
import { ApproveStudentArticleDto } from './dto/approve-student-article.dto';
import { CreateStudentArticleDto } from './dto/create-student-article.dto';
import { StudentArticlesService } from './student-articles.service';

@Controller('student-articles')
export class StudentArticlesController {
  constructor(private readonly studentArticlesService: StudentArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  submit(@Body() dto: CreateStudentArticleDto) {
    return this.studentArticlesService.create(dto);
  }

  @Get()
  listApproved(@Query('page') page?: string, @Query('limit') limit?: string, @Query('q') q?: string) {
    const parsedPage = Number(page ?? 1);
    const parsedLimit = Number(limit ?? 9);

    return this.studentArticlesService.listApproved(
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 9,
      q ?? '',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-image')
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
  @Get('admin/all')
  listAdmin(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
  ) {
    const parsedPage = Number(page ?? 1);
    const parsedLimit = Number(limit ?? 20);

    return this.studentArticlesService.adminList(
      status,
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 20,
      q ?? '',
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/:id/approve')
  approve(@Param('id', ParseIntPipe) id: number, @Body() dto: ApproveStudentArticleDto) {
    return this.studentArticlesService.approve(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/:id/reject')
  reject(@Param('id', ParseIntPipe) id: number) {
    return this.studentArticlesService.reject(id);
  }
}
