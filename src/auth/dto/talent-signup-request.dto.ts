import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
  ValidateNested,
  IsArray,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExperienceDto {
  @IsString()
  job_title: string;

  @IsString()
  company: string;

  @IsEnum(['full-time', 'part-time', 'contract'])
  contract_type: string;

  @IsOptional()
  @IsString()
  start_date?: string;

  @IsOptional()
  @IsString()
  end_date?: string;

  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}

class LocationDto {
  @IsOptional()
  @IsString()
  residentCountry?: string;

  @IsOptional()
  @IsString()
  residentState?: string;

  @IsOptional()
  @IsString()
  citizenship?: string;
}

export class TalentSignupRequest {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  talentBio?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsOptional()
  @IsString()
  englishProficiency?: string;

  @IsOptional()
  @IsNumber()
  onsiteExperience?: number;

  @IsOptional()
  @IsNumber()
  remoteExperience?: number;

  @IsOptional()
  @IsArray()
  @Type(() => ExperienceDto)
  onsite_experience?: ExperienceDto[];
}
