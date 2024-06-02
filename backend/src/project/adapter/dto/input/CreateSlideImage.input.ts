import { Field, ID, InputType } from '@nestjs/graphql';
import { UploadFileResponse } from '../../../../graphql/file/response/UploadFile.response';
import { SlideImageDto } from '../../../application/dto/SlideImage.dto';

@InputType()
export class SlideImageInput implements Partial<UploadFileResponse> {
  @Field(() => Number)
  seq: number;

  @Field(() => ID)
  key: string;

  toDto() {
    const dto = new SlideImageDto();
    dto.seq = this.seq;
    dto.key = this.key;
    return dto;
  }
}
