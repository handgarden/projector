import { Field, InputType, Int } from '@nestjs/graphql';
import { SlideResponse } from '../response/Slide.response';
import { DefaultValidationMessage } from '../../../../common/message/validation/DefaultValidation.message';
import {
  ArrayMaxSize,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { SlideImageInput } from './CreateSlideImage.input';
import { CreateSlideDto } from '../../../application/dto/CreateSlide.dto';

@InputType()
export class CreateSlideInput implements Partial<SlideResponse> {
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
  images: SlideImageInput[];

  toDto(userId: number) {
    const dto = new CreateSlideDto();
    dto.creatorId = userId;
    dto.projectId = this.projectId;
    dto.title = this.title;
    dto.description = this.description;
    dto.images = this.images.map((image) => image.toDto());
    return dto;
  }
}
