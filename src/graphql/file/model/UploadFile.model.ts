import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UploadFile } from '../../../core/entity/domain/UploadFile.entity';

@ObjectType(UploadFile.name)
export class UploadFileModel {
  @Field(() => ID)
  key: string;

  @Field(() => String)
  originalName: string;

  @Field(() => String)
  bucket: string;

  static fromEntity(uploadFile: UploadFile) {
    const model = new UploadFileModel();
    model.bucket = uploadFile.bucket;
    model.key = uploadFile.key;
    model.originalName = uploadFile.originalName;

    return model;
  }
}
