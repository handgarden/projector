import { Nil } from '../../../../common/nil/Nil';
import { UserDto } from '../../dto/User.dto';

export interface UserBatchQueryUseCase {
  loadUserById(id: number): Promise<Nil<UserDto>>;
}

export const UserBatchQueryUseCase = Symbol('UserBatchQueryUseCase');
