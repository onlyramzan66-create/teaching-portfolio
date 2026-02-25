import { IsEmail, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateTutorApplicationDto {
  @IsString()
  @MinLength(2)
  @MaxLength(140)
  fullName: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(180)
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(50)
  phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  teachingMode: string;

  @IsString()
  @MinLength(2)
  @MaxLength(220)
  subjects: string;

  @IsString()
  @MinLength(2)
  @MaxLength(160)
  experience: string;

  @IsString()
  @MinLength(2)
  @MaxLength(160)
  availability: string;

  @IsString()
  @MinLength(20)
  coverMessage: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(500)
  resumeUrl?: string;
}
