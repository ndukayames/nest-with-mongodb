import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TalentModule } from 'src/talent/talent.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TalentModule,
    JwtModule.register({}),
    ClientsModule.registerAsync([
      {
        name: 'notifications_ms',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get('KAFKA_BROKERS')],
              sasl: {
                mechanism: configService.get<any>('KAFKA_SASL_MECHANISM'),
                username: configService.get<string>('KAFKA_USERNAME'),
                password: configService.get<string>('KAFKA_PASSWORD'),
              },
              ssl: true,
              requestTimeout: 5000,
            },
            producerOnlyMode: true,
            consumer: {
              groupId: 'notifications_ms',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
})
export class AuthModule {}
