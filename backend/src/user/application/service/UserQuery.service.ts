import { Inject, Injectable } from '@nestjs/common';
import { UserQueryUseCase } from '../port/in/UserQueryUseCase';
import { UserPersistencePort } from '../port/out/UserPersistencePort';
import { UserDto } from '../dto/User.dto';

@Injectable()
export class UserQueryService implements UserQueryUseCase {
  constructor(
    @Inject(UserPersistencePort)
    private readonly userPersistencePort: UserPersistencePort,
  ) {}

  async getUser(id: number): Promise<UserDto> {
    const user = await this.userPersistencePort.findUserById(id);

    if (!user.isNil()) {
      throw new Error('User not found');
    }

    return UserDto.fromEntity(user.unwrap());
  }
}
