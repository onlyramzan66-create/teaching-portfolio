import { IsOptional, IsString } from 'class-validator';
import { StudentArticleStatus } from '../entities/student-article.entity';

export class AdminStudentArticlesQueryDto {
  @IsOptional()
  @IsString()
  status?: StudentArticleStatus;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}