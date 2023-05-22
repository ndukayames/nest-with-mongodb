import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TalentService } from './talent.service';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { TalentSignupRequest } from 'src/auth/dto/talent-signup-request.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('talents')
@UseGuards(JwtAuthGuard)
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Post()
  create(@Body() createTalentDto: TalentSignupRequest) {
    return this.talentService.create(createTalentDto);
  }

  @Get()
  findAll() {
    return this.talentService.findAll();
  }

  @Get('profile')
  findOne(@GetUser('id') id: mongoose.Schema.Types.ObjectId) {
    return this.talentService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalentDto: UpdateTalentDto) {
    return this.talentService.update(+id, updateTalentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentService.remove(+id);
  }
}
