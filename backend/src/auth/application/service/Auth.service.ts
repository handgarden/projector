import { JwtService } from '@nestjs/jwt';
import { Nil } from '../../../common/nil/Nil';
import { PasswordEncoder } from '../../../common/password/PasswordEncoder';
import { TokenPayload } from '../../../lib/auth/types/TokenPayload';
import { User } from '../../../user/domain/User.entity';
import { AuthUserDto } from '../dto/AuthUser.dto';
import { RegisterDto } from '../dto/Register.dto';
import { AuthMutateUseCase } from '../port/in/AuthMutateUseCase';
import { AuthUserPersistencePort } from '../port/out/AuthUserPersistencePort';

export class AuthService implements AuthMutateUseCase {
  constructor(
    private readonly authUserPersistencePort: AuthUserPersistencePort,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<AuthUserDto> {
    const hashedPassword = await this.passwordEncoder.encode(
      registerDto.password,
      10,
    );
    const user = User.register({
      account: registerDto.account,
      password: hashedPassword,
    });
    const saved = await this.authUserPersistencePort.save(user);
    return AuthUserDto.fromEntity(saved);
  }

  async login(user: User) {
    const payload: TokenPayload = {
      account: user.account,
      sub: user.id.toString(),
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(
    account: string,
    password: string,
  ): Promise<Nil<AuthUserDto>> {
    const userNil =
      await this.authUserPersistencePort.findOneByAccount(account);

    if (userNil.isNil()) {
      return userNil;
    }

    const user = userNil.unwrap();

    const isPasswordMatch = await this.passwordEncoder.matches(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      return Nil.empty();
    }

    return Nil.of(AuthUserDto.fromEntity(user));
  }
}
