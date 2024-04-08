import { Field, InputType } from '@nestjs/graphql';
import { ProjectModel } from '../model/Project.model';
import { CreateSlideInput } from './CreateSlide.input';
import { ArrayMinSize, IsNotEmpty, IsString, Length } from 'class-validator';
import { DefaultValidationMessage } from '../../../common/message/validation/DefaultValidation.message';

@InputType()
export class CreateProjectInput implements Partial<ProjectModel> {
  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  @Length(1, 255, { message: DefaultValidationMessage.LENGTH })
  title: string;

  @Field(() => [CreateSlideInput])
  @ArrayMinSize(1, { message: DefaultValidationMessage.ARRAY_MIN_SIZE })
  slides: CreateSlideInput[];
}
