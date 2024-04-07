import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UploadFile } from '../../../core/entity/domain/UploadFile.entity';
import { BaseTimeModel } from '../../common/BaseTimeModel';
import { DateTimeUtils } from '../../../util/DateTImeUtils';

@ObjectType(UploadFile.name)
export class UploadFileModel extends BaseTimeModel {
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

    model.createdAt = DateTimeUtils.toLocalDateTime(uploadFile.createdAt);
    model.updatedAt = DateTimeUtils.toLocalDateTime(uploadFile.updatedAt);

    return model;
  }
}
