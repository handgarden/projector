import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UploadFile } from '../../core/entity/domain/UploadFile.entity';

@ObjectType()
export class UploadFileModel {
  @Field(() => ID)
  key: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  originalName: string;

  @Field(() => String)
  bucket: string;

  static fromEntity(uploadFile: UploadFile, url: string) {
    const model = new UploadFileModel();
    model.bucket = uploadFile.bucket;
    model.key = uploadFile.key;
    model.originalName = uploadFile.originalName;
    model.url = url;

    return model;
  }
}
