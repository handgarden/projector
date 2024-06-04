import { UserDto } from '../../dto/User.dto';
import { CreateUserDto } from '../dto/CreateUserDto';

export interface UserMutateUseCase {
  createUser(dto: CreateUserDto): Promise<UserDto>;
}
