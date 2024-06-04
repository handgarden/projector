import { Nil } from '../../../../common/nil/Nil';
import { AuthUserDto } from '../../dto/AuthUser.dto';
import { RegisterDto } from '../../dto/Register.dto';

export interface AuthMutateUseCase {
  register(registerDto: RegisterDto): Promise<AuthUserDto>;
  validateUser(account: string, password: string): Promise<Nil<AuthUserDto>>;
  login(user: AuthUserDto): Promise<string>;
}
