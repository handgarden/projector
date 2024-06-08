import { Nil } from '../../../../common/nil/Nil';
import { BatchLoader } from '../../../../common/type/BatchLoader';
import { UploadFileDto } from '../dto/UploadFile.dto';

export interface UploadFileBatchLoadPort {
  loadUrlByKeys: BatchLoader<string, Nil<string>>;
  loadUploadFileByKey: BatchLoader<string, Nil<UploadFileDto>>;
}
