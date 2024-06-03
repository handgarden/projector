import { Nil } from '../../../../common/nil/Nil';
import { User } from '../../../domain/User.entity';
import { BatchLoader } from '../../../../common/type/BatchLoader';

export interface UserBatchQueryPort {
  loadUsersByIds: BatchLoader<number, Nil<User>>;
}
