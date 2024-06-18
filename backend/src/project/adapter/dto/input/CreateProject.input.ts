import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { DefaultValidationMessage } from '../../../../common/message/validation/DefaultValidation.message';
import { CreateProjectDto } from '../../../application/dto/CreateProject.dto';

@InputType()
export class CreateProjectInput implements Omit<CreateProjectDto, 'creatorId'> {
  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  @Length(1, 255, { message: DefaultValidationMessage.LENGTH })
  title: string;

  @Field(() => String)
  @IsString({ message: DefaultValidationMessage.IS_STRING })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  @Length(1, 255, { message: DefaultValidationMessage.LENGTH })
  description: string;

  toDto(userId: number): CreateProjectDto {
    const dto = new CreateProjectDto();
    dto.creatorId = userId;
    dto.title = this.title;
    dto.description = this.description;
    return dto;
  }
}
