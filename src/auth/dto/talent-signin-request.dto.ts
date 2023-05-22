import { IsString, IsEmail } from 'class-validator';

export class TalentSigninRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
