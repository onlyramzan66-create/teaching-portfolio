import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PushKeysDto {
  @IsString()
  @IsNotEmpty()
  p256dh: string;

  @IsString()
  @IsNotEmpty()
  auth: string;
}

class PushSubscriptionPayloadDto {
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @ValidateNested()
  @Type(() => PushKeysDto)
  keys: PushKeysDto;
}

export class SavePushSubscriptionDto {
  @ValidateNested()
  @Type(() => PushSubscriptionPayloadDto)
  subscription: PushSubscriptionPayloadDto;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(180)
  email?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}