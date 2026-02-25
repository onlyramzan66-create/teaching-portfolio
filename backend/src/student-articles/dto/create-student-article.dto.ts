import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateStudentArticleDto {
  @IsString()
  @MinLength(2)
  @MaxLength(140)
  studentName: string;

  @IsString()
  @MinLength(5)
  @MaxLength(220)
  title: string;

  @IsString()
  @MinLength(20)
  article: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  imageUrl?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  notesPdfUrl?: string;
}