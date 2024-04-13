import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SlideImage } from '../../../core/entity/domain/project/SlideImage.entity';
import { UploadFileModel } from '../../file/model/UploadFile.model';

@ObjectType(SlideImage.name)
export class SlideImageModel {
  @Field(() => Int)
  seq: number;

  @Field(() => UploadFileModel)
  file: UploadFileModel;

  static async fromEntity(slideImage: SlideImage) {
    const model = new SlideImageModel();
    model.seq = slideImage.seq;
    model.file = UploadFileModel.fromEntity(await slideImage.file);
    return model;
  }
}
