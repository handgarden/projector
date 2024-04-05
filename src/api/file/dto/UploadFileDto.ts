export class UploadFileDto {
  fileKey: string;
  createdAt: Date;

  constructor(fileKey: string, createdAt: Date) {
    this.fileKey = fileKey;
    this.createdAt = createdAt;
  }
}
