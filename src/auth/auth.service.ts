import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TalentService } from 'src/talent/talent.service';
import * as argon from 'argon2';
import { TalentSigninRequest } from './dto/talent-signin-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TalentSignupRequest } from './dto/talent-signup-request.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private talentService: TalentService,
    private jwt: JwtService,
    private configService: ConfigService,
    @Inject('notifications_ms')
    private notificationMsClient: ClientKafka,
  ) {}

  async talentSignup(talentSignupRequest: TalentSignupRequest) {
    talentSignupRequest.password = await argon.hash(
      talentSignupRequest.password,
    );
    const talent = await this.talentService.signup(talentSignupRequest);
    this.notificationMsClient.emit('new_talent_signup', {
      email: talent.email,
      name: `${talent.firstName} ${talent.lastName}`,
    });
    return talentSignupRequest;
  }

  async talentSignin(talentSigninRequest: TalentSigninRequest) {
    const talent = await this.talentService.findTalentByEmmail(
      talentSigninRequest.email,
    );

    if (!talent) throw new UnauthorizedException('Invalid email');

    const isPasswordValid: boolean = await argon.verify(
      talent.password,
      talentSigninRequest.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException('Wrong password');

    const tokenPayload = {
      sub: talent._id,
    };

    const tokenOption = {
      expiresIn: '150m',
      secret: this.configService.get('JWT_SECRET'),
    };
    const authToken = await this.jwt.signAsync(tokenPayload, tokenOption);

    return { access_token: authToken };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
