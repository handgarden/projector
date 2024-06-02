import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SlideImage } from '../../../domain/SlideImage.entity';
import { UploadFileResponse } from '../../../../graphql/file/response/UploadFile.response';

@ObjectType(SlideImage.name)
export class SlideImageResponse {
  @Field(() => Int)
  seq: number;

  @Field(() => UploadFileResponse)
  file: UploadFileResponse;

  static async fromEntity(slideImage: SlideImage) {
    const model = new SlideImageResponse();
    model.seq = slideImage.seq;
    model.file = UploadFileResponse.fromEntity(await slideImage.file);
    return model;
  }
}
