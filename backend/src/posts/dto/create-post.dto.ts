import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(220)
  slug?: string;

  @IsString()
  @IsOptional()
  @MaxLength(600)
  excerpt?: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  featureImage?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  notesPdfUrl?: string;

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

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
