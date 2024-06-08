import { Field, ID, InputType } from '@nestjs/graphql';
import { UploadFileResponse } from '../../../../file/application/adapter/dto/UploadFile.response';
import { CreateSlideImageDto } from '../../../application/dto/CreateSlideImage.dto';

@InputType()
export class SlideImageInput implements Partial<UploadFileResponse> {
  @Field(() => Number)
  seq: number;

  @Field(() => ID)
  key: string;

  toDto() {
    const dto = new CreateSlideImageDto();
    dto.seq = this.seq;
    dto.key = this.key;
    return dto;
  }
}
