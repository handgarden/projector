import { Nil } from '../../../../common/nil/Nil';
import { UserDto } from '../../dto/User.dto';
import { CreateUserDto } from '../dto/CreateUserDto';
import { LoginDto } from '../dto/Login.dto';

export interface UserMutateUseCase {
  register(registerDto: CreateUserDto): Promise<UserDto>;
  validateUser(loginDto: LoginDto): Promise<Nil<UserDto>>;
  login(user: UserDto): Promise<UserDto>;
}

export const UserMutateUseCase = Symbol('UserMutateUseCase');
