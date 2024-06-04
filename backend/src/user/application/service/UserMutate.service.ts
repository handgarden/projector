import { User } from '../../domain/User.entity';
import { UserDto } from '../dto/User.dto';
import { CreateUserDto } from '../port/dto/CreateUserDto';
import { UserMutateUseCase } from '../port/in/UserMutateUseCase';
import { UserPersistencePort } from '../port/out/UserPersistencePort';

export class UserMutateService implements UserMutateUseCase {
  constructor(private readonly userPersistencePort: UserPersistencePort) {}
  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const user = User.register({
      account: dto.account,
      password: dto.password,
    });
    const saved = await this.userPersistencePort.save(user);
    return UserDto.fromEntity(saved);
  }
}
