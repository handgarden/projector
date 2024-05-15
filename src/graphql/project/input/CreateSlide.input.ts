import { Field, InputType, Int } from '@nestjs/graphql';
import { SlideResponse } from '../response/Slide.response';
import { DefaultValidationMessage } from '../../../common/message/validation/DefaultValidation.message';
import {
  ArrayMaxSize,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { CreateSlideImageInput } from './CreateSlideImage.input';

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

  @Field(() => [CreateSlideImageInput], { nullable: 'items' })
  @ArrayMaxSize(5, { message: DefaultValidationMessage.ARRAY_MAX_SIZE })
  images: CreateSlideImageInput[];
}
