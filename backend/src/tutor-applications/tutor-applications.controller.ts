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
import { buildFileUrl, resumeUploadOptions } from '../common/upload';
import { UserRole } from '../users/entities/user.entity';
import { CreateTutorApplicationDto } from './dto/create-tutor-application.dto';
import { UpdateTutorApplicationStatusDto } from './dto/update-tutor-application-status.dto';
import { TutorApplicationsService } from './tutor-applications.service';

@Controller('tutor-applications')
export class TutorApplicationsController {
  constructor(private readonly tutorApplicationsService: TutorApplicationsService) {}

  @Post()
  submit(@Body() dto: CreateTutorApplicationDto) {
    return this.tutorApplicationsService.create(dto);
  }

  @Post('upload-resume')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', resumeUploadOptions))
  uploadResume(
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
  adminList(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('q') q?: string,
  ) {
    const parsedPage = Number(page ?? 1);
    const parsedLimit = Number(limit ?? 20);

    return this.tutorApplicationsService.adminList(
      status,
      Number.isFinite(parsedPage) ? parsedPage : 1,
      Number.isFinite(parsedLimit) ? parsedLimit : 20,
      q ?? '',
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTutorApplicationStatusDto,
  ) {
    return this.tutorApplicationsService.updateStatus(id, dto);
  }
}
