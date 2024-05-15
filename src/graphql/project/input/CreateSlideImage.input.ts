import { Field, ID, InputType } from '@nestjs/graphql';
import { UploadFileResponse } from '../../file/response/UploadFile.response';

@InputType()
export class CreateSlideImageInput implements Partial<UploadFileResponse> {
  @Field(() => Number)
  seq: number;

  @Field(() => ID)
  key: string;
}
