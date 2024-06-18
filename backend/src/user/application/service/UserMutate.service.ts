import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '../port/dto/Register.dto';
import { PasswordEncoder } from '../../../common/password/PasswordEncoder';
import { User } from '../../domain/User.entity';
import { UserPersistencePort } from '../port/out/UserPersistencePort';
import { Nil } from '../../../common/nil/Nil';
import { UserMutateUseCase } from '../port/in/UserMutateUseCase';
import { UserDto } from '../dto/User.dto';
import { LoginDto } from '../port/dto/Login.dto';

@Injectable()
export class UserMutateService implements UserMutateUseCase {
  constructor(
    @Inject(PasswordEncoder) private readonly passwordEncoder: PasswordEncoder,
    @Inject(UserPersistencePort)
    private readonly userPersistencePort: UserPersistencePort,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
    const hashedPassword = await this.passwordEncoder.encode(
      registerDto.password,
      10,
    );

    const user = User.register({
      account: registerDto.account,
      password: hashedPassword,
    });
    const saved = await this.userPersistencePort.save(user);
    return UserDto.fromEntity(saved);
  }

  async login(user: UserDto): Promise<UserDto> {
    return user;
  }

  async validateUser(loginDto: LoginDto): Promise<Nil<UserDto>> {
    const userNil = await this.userPersistencePort.findUserByAccount(
      loginDto.account,
    );

    if (userNil.isNil()) {
      return Nil.empty();
    }

    const user = userNil.unwrap();

    const isPasswordMatch = await this.passwordEncoder.matches(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      return Nil.empty();
    }

    return Nil.of(UserDto.fromEntity(user));
  }
}
