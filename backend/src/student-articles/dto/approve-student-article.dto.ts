import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class ApproveStudentArticleDto {
  @IsOptional()
  @IsString()
  @MaxLength(70)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  seoDescription?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  canonicalUrl?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  seoImage?: string;
}