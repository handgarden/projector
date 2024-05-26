import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../Auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account',
    });
  }

  async validate(account: string, password: string) {
    const user = await this.authService.validateUser(account, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
