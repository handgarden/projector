import { DataSource, In, Repository } from 'typeorm';
import { UploadFile } from '../../domain/UploadFile.entity';
import { UploadFilePersistencePort } from '../../application/port/out/UploadFilePersistencePort';
import { Injectable } from '@nestjs/common';
import { Nil } from '../../../common/nil/Nil';

@Injectable()
export class UploadFileTypeORMRepository
  extends Repository<UploadFile>
  implements UploadFilePersistencePort
{
  constructor(dataSource: DataSource) {
    super(UploadFile, dataSource.manager);
  }
  findByKeysIn(keys: string[]): Promise<UploadFile[]> {
    return this.find({
      where: {
        key: In(keys),
      },
    });
  }
  async findOneByKey(key: string): Promise<Nil<UploadFile>> {
    const file = await this.findOne({
      where: {
        key,
      },
    });
    return Nil.of(file);
  }

  saveOne(uploadFile: UploadFile): Promise<UploadFile> {
    return this.save(uploadFile);
  }
  saveMany(uploadFiles: UploadFile[]): Promise<UploadFile[]> {
    return this.save(uploadFiles);
  }
}
