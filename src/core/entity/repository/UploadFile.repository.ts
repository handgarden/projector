import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { UploadFile } from '../domain/UploadFile.entity';
import { Nil } from '../../../common/nil/Nil';
import { User } from '../domain/user/User.entity';

@Injectable()
export class UploadFileRepository extends Repository<UploadFile> {
  constructor(dataSource: DataSource) {
    super(UploadFile, dataSource.manager);
  }

  async findByKey(key: string) {
    const file = await this.findOne({
      where: {
        key,
      },
    });

    return Nil.of(file);
  }

  async findUserByKeys(keys: string[]): Promise<[string, User][]> {
    const files = await this.find({
      select: {
        key: true,
        uploader: true,
      },
      where: {
        key: In(keys),
      },
      relations: {
        uploader: true,
      },
    });

    return Promise.all(
      files.map(async (file) => [file.key, await file.uploader]),
    );
  }
}
