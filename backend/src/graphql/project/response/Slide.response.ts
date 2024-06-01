import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Slide } from '../../../project/domain/Slide.entity';
import { BaseTimeResponse } from '../../common/BaseTimeResponse';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

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

  static fromEntity(slide: Slide) {
    const model = new SlideResponse();
    model.id = slide.id.toString();
    model.seq = slide.seq;
    model.title = slide.title;
    model.description = slide.description;
    model.createdAt = DateTimeUtils.toLocalDateTime(slide.createdAt);
    model.updatedAt = DateTimeUtils.toLocalDateTime(slide.updatedAt);
    return model;
  }
}
