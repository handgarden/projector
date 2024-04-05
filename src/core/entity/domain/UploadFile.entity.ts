import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { RawFile } from 'src/lib/s3/RawFile';
import { UploadFileDto } from 'src/api/file/dto/UploadFileDto';

@Entity()
export class UploadFile extends BaseTimeEntity {
  @PrimaryColumn({
    name: 'file_key',
    type: 'varchar',
    length: 255,
  })
  fileKey: string;

  @Column()
  originalName: string;

  @Column()
  bucket: string;

  fromRawFile(bucket: string, file: RawFile): UploadFile {
    this.fileKey = file.key;
    this.originalName = file.originalname;
    this.bucket = bucket;
    return this;
  }

  toDto(): UploadFileDto {
    return new UploadFileDto(this.fileKey, this.createdAt);
  }
}
