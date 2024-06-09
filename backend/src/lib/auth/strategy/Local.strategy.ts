import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserMutateUseCase } from '../../../user/application/port/in/UserMutateUseCase';
import { LoginDto } from '../../../user/application/port/dto/Login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserMutateUseCase)
    private readonly userMutateUseCase: UserMutateUseCase,
  ) {
    super({
      usernameField: 'account',
    });
  }

  async validate(account: string, password: string) {
    const userDto = new LoginDto({
      account,
      password,
    });

    const user = await this.userMutateUseCase.validateUser(userDto);

    if (user.isNil()) {
      throw new UnauthorizedException();
    }

    return user.unwrap();
  }
}
