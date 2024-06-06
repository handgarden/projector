import { UserDto } from '../../dto/User.dto';

export interface UserQueryUseCase {
  getUser(id: number): Promise<UserDto>;
}

export const UserQueryUseCase = Symbol('UserQueryUseCase');
