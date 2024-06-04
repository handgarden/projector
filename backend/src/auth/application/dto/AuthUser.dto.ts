import { User } from '../../../user/domain/User.entity';

export class AuthUserDto {
  id: number;
  account: string;

  constructor(id: number, account: string) {
    this.id = id;
    this.account = account;
  }

  static fromEntity(user: User): AuthUserDto {
    return new AuthUserDto(user.id, user.account);
  }
}
