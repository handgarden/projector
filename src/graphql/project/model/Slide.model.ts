import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Slide } from '../../../core/entity/domain/project/Slide.entity';
import { BaseTimeModel } from '../../common/BaseTimeModel';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

@ObjectType(Slide.name)
export class SlideModel extends BaseTimeModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  seq: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  static fromEntity(slide: Slide) {
    const model = new SlideModel();
    model.id = slide.id.toString();
    model.seq = slide.seq;
    model.title = slide.title;
    model.description = slide.description;
    model.createdAt = DateTimeUtils.toLocalDateTime(slide.createdAt);
    model.updatedAt = DateTimeUtils.toLocalDateTime(slide.updatedAt);
    return model;
  }
}
