import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { BatchLoader } from '../../../common/type/BatchLoader';
import { UploadFileBatchLoadPort } from '../../application/port/out/UploadFileBatchLoadPort';
import { Nil } from '../../../common/nil/Nil';
import { UploadFileDto } from '../../application/port/dto/UploadFile.dto';
import { UploadFilePersistencePort } from '../../application/port/out/UploadFilePersistencePort';
import * as DataLoader from 'dataloader';
import { UploadFileObjectStoragePort } from '../../application/port/out/UploadFileObjectStoragePort';

@Injectable({
  scope: Scope.REQUEST,
})
export class UploadFileBatchDataLoader implements UploadFileBatchLoadPort {
  private readonly logger: Logger = new Logger(UploadFileBatchDataLoader.name);
  constructor(
    @Inject(UploadFilePersistencePort)
    private readonly uploadFilePersistencePort: UploadFilePersistencePort,
    @Inject(UploadFileObjectStoragePort)
    private readonly uploadFileObjectStoragePort: UploadFileObjectStoragePort,
  ) {}

  loadUploadFileByKey: BatchLoader<string, Nil<UploadFileDto>> = new DataLoader(
    async (keys: string[]) => {
      const uploadFiles =
        await this.uploadFilePersistencePort.findByKeysIn(keys);

      const urls = await Promise.all(
        uploadFiles.map(async (file) => {
          try {
            const url = await this.uploadFileObjectStoragePort.getPresignedUrl(
              file.key,
            );
            return Nil.of<string>(url);
          } catch (e) {
            this.logger.error(e);
            return Nil.empty<string>();
          }
        }),
      );

      return keys.map((key, index) => {
        const uploadFile = uploadFiles.find((file) => file.key === key);
        if (!uploadFile) {
          return Nil.empty();
        }
        const url = urls[index];
        if (url.isNil()) {
          return Nil.empty();
        }

        return Nil.of(new UploadFileDto(url.unwrap(), uploadFile));
      });
    },
  );
  loadUrlByKeys: BatchLoader<string, Nil<string>> = new DataLoader(
    async (keys: string[]) => {
      const urls = await Promise.all(
        keys.map(async (key) => {
          try {
            const url =
              await this.uploadFileObjectStoragePort.getPresignedUrl(key);
            return Nil.of<string>(url);
          } catch (e) {
            this.logger.error(e);
            return Nil.empty<string>();
          }
        }),
      );

      return keys.map((key, index) => urls[index]);
    },
  );
}
