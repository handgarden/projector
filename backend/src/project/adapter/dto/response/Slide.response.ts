import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Slide } from '../../../domain/Slide.entity';
import { BaseTimeResponse } from '../../../../graphql/common/BaseTimeResponse';
import { SlideDto } from '../../../application/dto/Slide.dto';

@ObjectType(Slide.name)
export class SlideResponse extends BaseTimeResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  seq: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  static fromDto(slide: SlideDto) {
    const model = new SlideResponse();
    model.id = slide.id.toString();
    model.seq = slide.seq;
    model.title = slide.title;
    model.description = slide.description;
    model.createdAt = slide.createdAt;
    model.updatedAt = slide.updatedAt;
    return model;
  }
}
