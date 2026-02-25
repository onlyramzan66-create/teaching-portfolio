import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TutorApplicationStatus } from '../entities/tutor-application.entity';

export class UpdateTutorApplicationStatusDto {
  @IsEnum(TutorApplicationStatus)
  status: TutorApplicationStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  adminNotes?: string;
}
