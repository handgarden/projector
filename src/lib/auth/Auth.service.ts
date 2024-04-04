import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from './types/TokenPayload';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from 'src/api/auth/dto/RegisterRequest.dto';
import { DuplicateAccountError } from './error/AccountDuplicateError';
import { LoginResponseDto } from 'src/api/auth/dto/LoginResponse.dto';
import { UserRepository } from 'src/core/entity/repository/User.repository';
import { User } from 'src/core/entity/domain/User.entity';
import { PasswordEncoder } from 'src/common/password/PasswordEncoder';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(PasswordEncoder) private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async register({ account, password }: RegisterRequestDto) {
    const isDuplicated = await this.userRepository.findOneByAccount(account);
    if (isDuplicated.isNotNil()) {
      throw new DuplicateAccountError({ account, password });
    }

    const hashedPassword = await this.passwordEncoder.encode(password, 10);
    await this.userRepository.save({ account, password: hashedPassword });
    return true;
  }

  async validateUser(account: string, password: string): Promise<User | null> {
    const userNil = await this.userRepository.findOneByAccount(account);
    if (userNil.isNil()) {
      return null;
    }
    const user = userNil.unwrap();

    const isPasswordMatch = await this.passwordEncoder.matches(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload: TokenPayload = {
      account: user.account,
      sub: user.id.toString(),
    };

    const accessToken = this.jwtService.sign(payload);

    return new LoginResponseDto(accessToken);
  }
}
