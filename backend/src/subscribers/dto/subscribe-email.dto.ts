import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class SubscribeEmailDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(180)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  source?: string;
}