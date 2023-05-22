import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { Talent } from './schemas/talents.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TalentSignupRequest } from 'src/auth/dto/talent-signup-request.dto';

@Injectable()
export class TalentService {
  constructor(@InjectModel(Talent.name) private talentModel: Model<Talent>) {}
  create(createTalentDto: TalentSignupRequest) {
    return 'This action adds a new talent';
  }

  findAll() {
    return `This action returns all talent`;
  }

  async findById(id: mongoose.Schema.Types.ObjectId) {
    return await this.talentModel.findById(id);
  }

  update(id: number, updateTalentDto: UpdateTalentDto) {
    return `This action updates a #${id} talent`;
  }

  remove(id: number) {
    return `This action removes a #${id} talent`;
  }

  async signup(talentSignupRequest: TalentSignupRequest) {
    // find if user still exists
    const existingUser = await this.talentModel.findOne({
      email: talentSignupRequest.email,
    });

    if (existingUser) {
      throw new ConflictException('User with this email exists.');
    }
    // create new user
    const newUser = new this.talentModel(talentSignupRequest);

    return await newUser.save();
  }

  async findTalentByEmmail(email: string) {
    // find if user still exists
    const existingUser = await this.talentModel.findOne({
      email,
    });
    return existingUser;
  }
}
