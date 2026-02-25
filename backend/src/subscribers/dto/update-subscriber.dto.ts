import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSubscriberDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}