import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Talent {
  @Prop({
    required: true,
    default: undefined,
  })
  firstName: string;

  @Prop({
    required: true,
    default: undefined,
  })
  lastName: string;

  @Prop({
    required: true,
    default: undefined,
  })
  title: string;

  @Prop({
    required: false,
    default: undefined,
  })
  phoneNumber: string;

  @Prop({
    required: true,
    default: false,
  })
  email: string;

  @Prop({
    required: true,
    default: undefined,
  })
  password: string;

  @Prop()
  talentBio: string;

  @Prop({
    type: {
      residentCountry: {
        type: String,
        required: false,
        trim: true,
      },
      residentState: {
        type: String,
        required: false,
        trim: true,
      },
      citizenship: {
        type: String,
        required: false,
        trim: true,
      },
    },
  })
  location: {
    residentCountry: string;
    residentState: string;
    citizenship: string;
  };

  @Prop({
    trim: true,
  })
  englishProficiency: string;

  @Prop()
  onsiteExperience: number;

  @Prop()
  remoteExperience: number;

  @Prop({
    type: [
      {
        job_title: {
          type: String,
          required: false,
          trim: true,
        },
        company: {
          type: String,
          required: false,
          trim: true,
        },
        contract_type: {
          type: String,
          enum: ['full-time', 'part-time', 'contract'],
          required: false,
          trim: true,
        },
        start_date: {
          type: Date,
          required: false,
          trim: true,
        },
        end_date: {
          type: Date,
          required: false,
          trim: true,
        },
        current: {
          type: Boolean,
          required: false,
          trim: true,
        },
        location: {
          type: String,
          required: false,
          trim: true,
        },
        skills: [String],
      },
    ],
    required: false,
    default: undefined,
  })
  onsite_experience: Record<string, any>;
}

export type TalentDocument = HydratedDocument<Talent>;

export const TalentSchema = SchemaFactory.createForClass(Talent);
