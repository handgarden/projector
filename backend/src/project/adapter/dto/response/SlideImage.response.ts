import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SlideImage } from '../../../domain/SlideImage.entity';
import { SlideImageDto } from '../../../application/dto/SlideImage.dto';

@ObjectType(SlideImage.name)
export class SlideImageResponse {
  @Field(() => Int)
  seq: number;

  imageKey: string;

  static fromDto(slideImage: SlideImageDto) {
    const model = new SlideImageResponse();
    model.seq = slideImage.seq;
    model.imageKey = slideImage.imageKey;
    return model;
  }
}
