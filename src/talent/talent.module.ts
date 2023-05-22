import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Talent, TalentSchema } from './schemas/talents.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Talent.name,
        schema: TalentSchema,
      },
    ]),
  ],
  controllers: [TalentController],
  providers: [TalentService],
  exports: [TalentService],
})
export class TalentModule {}
