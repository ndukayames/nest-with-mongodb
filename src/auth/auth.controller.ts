import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TalentSigninRequest } from './dto/talent-signin-request.dto';
import { TalentSignupRequest } from './dto/talent-signup-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('talent/signup')
  talentSignup(@Body() talentSignupRequest: TalentSignupRequest) {
    return this.authService.talentSignup(talentSignupRequest);
  }

  @Post('talent/signin')
  talentSignin(@Body() talentSigninRequest: TalentSigninRequest) {
    return this.authService.talentSignin(talentSigninRequest);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: any) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
