import { Field, ID, InputType } from '@nestjs/graphql';
import { UploadFileModel } from '../../file/model/UploadFile.model';

@InputType()
export class CreateSlideImageInput implements Partial<UploadFileModel> {
  @Field(() => Number)
  seq: number;

  @Field(() => ID)
  key: string;
}
