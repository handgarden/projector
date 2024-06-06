import { Inject, Injectable } from '@nestjs/common';
import { UserBatchQueryPort } from '../port/out/UserBatchQueryPort';
import { UserBatchQueryUseCase } from '../port/in/UserBatchQueryUseCase';
import { Nil } from '../../../common/nil/Nil';
import { UserDto } from '../dto/User.dto';

@Injectable()
export class UserBatchQueryService implements UserBatchQueryUseCase {
  constructor(
    @Inject(UserBatchQueryPort)
    private readonly userBatchQueryPort: UserBatchQueryPort,
  ) {}
  async loadUserById(id: number): Promise<Nil<UserDto>> {
    const user = await this.userBatchQueryPort.loadUsersByIds.load(id);

    if (user.isNil()) {
      return Nil.empty();
    }

    return Nil.of(UserDto.fromEntity(user.unwrap()));
  }
}
