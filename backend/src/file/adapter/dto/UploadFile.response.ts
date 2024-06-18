import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UploadFile } from '../../domain/UploadFile.entity';
import { BaseTimeResponse } from '../../../graphql/common/BaseTimeResponse';
import { DateTimeUtils } from '../../../util/DateTImeUtils';
import { UploadFileDto } from '../../application/port/dto/UploadFile.dto';

@ObjectType(UploadFile.name)
export class UploadFileResponse extends BaseTimeResponse {
  @Field(() => ID)
  key: string;

  @Field(() => String)
  originalName: string;

  @Field(() => String)
  url: string;

  userId: number;

  static fromDto(uploadFile: UploadFileDto) {
    const model = new UploadFileResponse();
    model.key = uploadFile.key;
    model.originalName = uploadFile.originalName;
    model.url = uploadFile.url;
    model.createdAt = DateTimeUtils.toLocalDateTime(uploadFile.createdAt);
    model.updatedAt = DateTimeUtils.toLocalDateTime(uploadFile.updatedAt);
    model.userId = uploadFile.userId;

    return model;
  }
}
