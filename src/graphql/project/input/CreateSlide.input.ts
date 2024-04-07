import { Field, InputType, Int } from '@nestjs/graphql';
import { SlideModel } from '../model/Slide.model';
import { DefaultValidationMessage } from '../../../common/message/validation/DefaultValidation.message';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateSlideInput implements Partial<SlideModel> {
  @Field(() => Int)
  @IsInt({ message: DefaultValidationMessage.IS_NUMBER })
  seq: number;

  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @Length(1, 255, { message: DefaultValidationMessage.LENGTH })
  title: string;

  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  description: string;
}
