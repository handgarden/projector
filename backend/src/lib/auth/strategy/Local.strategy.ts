import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserMutateUseCase } from '../../../user/application/port/in/UserMutateUseCase';
import { RegisterDto } from '../../../user/application/port/dto/Register.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userMutateUseCase: UserMutateUseCase) {
    super({
      usernameField: 'account',
    });
  }

  async validate(account: string, password: string) {
    const registerDto = new RegisterDto({
      account,
      password,
    });

    const user = await this.userMutateUseCase.validateUser(registerDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
