import { PartialType } from '@nestjs/mapped-types';
import { TalentSignupRequest } from 'src/auth/dto/talent-signup-request.dto';

export class UpdateTalentDto extends PartialType(TalentSignupRequest) {}
