import { UploadFile } from '../../../domain/UploadFile.entity';

export class UploadFileDto {
  key: string;
  userId: number;
  url: string;
  originalName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(url: string, uploadFile: UploadFile) {
    this.url = url;
    this.key = uploadFile.key;
    this.userId = uploadFile.uploaderId;
    this.originalName = uploadFile.originalName;
    this.createdAt = uploadFile.createdAt;
    this.updatedAt = uploadFile.updatedAt;
  }
}
