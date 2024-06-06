import { Inject, Injectable, Scope } from '@nestjs/common';
import { UserBatchQueryPort } from '../../application/port/out/UserBatchQueryPort';
import { UserPersistencePort } from '../../application/port/out/UserPersistencePort';
import * as DataLoader from 'dataloader';
import { Nil } from '../../../common/nil/Nil';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserBatchDataLoader implements UserBatchQueryPort {
  constructor(
    @Inject(UserPersistencePort)
    private readonly userPersistencePort: UserPersistencePort,
  ) {}
  loadUsersByIds = new DataLoader(async (ids: number[]) => {
    const users = await this.userPersistencePort.findUsersByIds(ids);
    return ids.map((id) => Nil.of(users.find((user) => user.id === id)));
  });
}
