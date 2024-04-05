import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UploadFile } from '../domain/UploadFile.entity';

@Injectable()
export class UploadFileRepository extends Repository<UploadFile> {
  constructor(dataSource: DataSource) {
    super(UploadFile, dataSource.manager);
  }
}
