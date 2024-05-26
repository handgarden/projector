import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { BaseTimeEntity } from '../BaseTimeEntity';
import { User } from './user/User.entity';
import { StoredFile } from '../../../lib/s3/StoredFile';

@Entity()
export class UploadFile extends BaseTimeEntity {
  @PrimaryColumn({
    name: 'file_key',
    type: 'varchar',
    length: 255,
  })
  key: string;

  @Column()
  originalName: string;

  @Column()
  bucket: string;

  @ManyToOne(() => User, { nullable: false, lazy: true })
  @JoinColumn({
    name: 'uploader_id',
  })
  uploader: Promise<User>;

  @RelationId((self: UploadFile) => self.uploader)
  uploaderId: number;

  static fromStoredFile(uploader: User, storedFile: StoredFile): UploadFile {
    const uploadFile = new UploadFile();
    uploadFile.bucket = storedFile.bucket;
    uploadFile.key = storedFile.key;
    uploadFile.originalName = storedFile.originalName;
    uploadFile.uploader = Promise.resolve(uploader);
    return uploadFile;
  }
}
