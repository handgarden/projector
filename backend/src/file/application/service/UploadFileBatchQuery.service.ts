import { Inject, Injectable } from '@nestjs/common';
import { Nil } from '../../../common/nil/Nil';
import { UploadFileDto } from '../port/dto/UploadFile.dto';
import { UploadFileBatchQueryUseCase } from '../port/in/UploadFileBatchQueryUseCase';
import { UploadFileBatchLoadPort } from '../port/out/UploadFileBatchLoadPort';

@Injectable()
export class UploadFileBatchQueryService
  implements UploadFileBatchQueryUseCase
{
  constructor(
    @Inject(UploadFileBatchLoadPort)
    private readonly uploadFileBatchLoadPort: UploadFileBatchLoadPort,
  ) {}
  loadUploadFileByKey(key: string): Promise<Nil<UploadFileDto>> {
    return this.uploadFileBatchLoadPort.loadUploadFileByKey.load(key);
  }
  loadUrlByKey(key: string): Promise<Nil<string>> {
    return this.uploadFileBatchLoadPort.loadUrlByKeys.load(key);
  }
}
