import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from './types/TokenPayload';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from 'src/auth/adapter/dto/RegisterRequest.dto';
import { DuplicateAccountError } from './error/AccountDuplicateError';
import { LoginResponseDto } from 'src/auth/adapter/dto/LoginResponse.dto';
import { UserRepository } from 'src/core/entity/repository/User.repository';
import { User } from 'src/user/domain/User.entity';
import { PasswordEncoder } from 'src/common/password/PasswordEncoder';
import { OAuthProfileDto } from './oauth/dto/OAuthProfile';
import { OAuthProfile } from '../../auth/domain/OAuthProfile.entity';
import { OAuthProfileRepository } from '../../core/entity/repository/OAuthProfile.repository';
import { OAuthProvider } from '../../core/entity/enum/OAuthProvider';
import { DuplicateOAuthProfileError } from './error/DuplicateOAuthProfileError';
import { OAuthAccountNotFoundError } from './error/OAuthAccountNotFoundError';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly oauthProfileRepository: OAuthProfileRepository,
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

  async OAuthLogin(oauthProfile: OAuthProfileDto) {
    const userNil =
      await this.userRepository.findOneByOAuthProfile(oauthProfile);

    if (userNil.isNil()) {
      throw new OAuthAccountNotFoundError();
    }

    return this.login(userNil.unwrap());
  }

  async login(user: User) {
    const payload: TokenPayload = {
      account: user.account,
      sub: user.id.toString(),
    };

    const accessToken = this.jwtService.sign(payload);

    return new LoginResponseDto(accessToken);
  }

  async linkOAuthProfile(userId: number, oauthProfile: OAuthProfileDto) {
    const profile = OAuthProfile.fromDto(userId, oauthProfile);

    await this.checkOAuthProfileDuplicate(profile.provider, userId);

    await this.oauthProfileRepository.save(profile);
  }

  async unlinkOAuthProfile(userId: number, provider: OAuthProvider) {
    await this.oauthProfileRepository.deleteByUserIdAndProvider(
      userId,
      provider,
    );
  }

  private async checkOAuthProfileDuplicate(
    provider: OAuthProvider,
    userId: number,
  ) {
    const profileNil =
      await this.oauthProfileRepository.findOneByProviderAndUserId(
        provider,
        userId,
      );
    if (profileNil.isNotNil()) {
      throw new DuplicateOAuthProfileError({ userId, provider });
    }
  }
}
