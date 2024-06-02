import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { DefaultValidationMessage } from '../../../../common/message/validation/DefaultValidation.message';
import { UpdateProjectDto } from '../../../application/dto/UpdateProject.dto';

@InputType()
export class UpdateProjectInput implements Omit<CreateProjectDto, 'creatorId'> {
  @Field(() => String)
  @IsInt({ message: DefaultValidationMessage.IS_NUMBER })
  @IsNotEmpty({ message: DefaultValidationMessage.IS_NOT_EMPTY })
  id: number;

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

  toDto(userId: number): UpdateProjectDto {
    const dto = new UpdateProjectDto();
    dto.creatorId = userId;
    dto.projectId = this.id;
    dto.title = this.title;
    dto.description = this.description;
    return dto;
  }
}
