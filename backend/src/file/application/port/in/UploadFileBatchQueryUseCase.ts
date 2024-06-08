import { Nil } from '../../../../common/nil/Nil';
import { UploadFileDto } from '../dto/UploadFile.dto';

export interface UploadFileBatchQueryUseCase {
  loadUrlByKey(key: string): Promise<Nil<string>>;
  loadUploadFileByKey(key: string): Promise<Nil<UploadFileDto>>;
}
