import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { UpdateSlideDto } from '../../../application/dto/UpdateSlide.dto';
import { DefaultValidationMessage } from '../../../../common/message/validation/DefaultValidation.message';
import {
  ArrayMaxSize,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { SlideImageInput } from './CreateSlideImage.input';
import { Type } from 'class-transformer';

@InputType()
export class UpdateSlideInput {
  @Field(() => Int)
  @IsInt({ message: DefaultValidationMessage.IS_NUMBER })
  projectId: number;

  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @Length(1, 255, { message: DefaultValidationMessage.LENGTH })
  title: string;

  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  description: string;

  @Field(() => [SlideImageInput], { nullable: 'items' })
  @ArrayMaxSize(5, { message: DefaultValidationMessage.ARRAY_MAX_SIZE })
  @Type(() => SlideImageInput)
  images: SlideImageInput[];

  @Field(() => ID)
  slideId: string;

  toDto(userId: number): UpdateSlideDto {
    const dto = new UpdateSlideDto();
    dto.title = this.title;
    dto.description = this.description;
    dto.slideId = parseInt(this.slideId, 10);
    dto.projectId = this.projectId;
    dto.creatorId = userId;
    dto.images = this.images.map((image) => image.toDto());
    return dto;
  }
}
