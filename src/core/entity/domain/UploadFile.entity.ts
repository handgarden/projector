import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { RawFile } from 'src/lib/s3/RawFile';
import { User } from './User.entity';
import { UploadFileDto } from '../../../api/file/dto/UploadFileDto';

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

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: 'uploader_id',
  })
  uploader: User;

  @RelationId((self: UploadFile) => self.uploader)
  uploaderId: number;

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
