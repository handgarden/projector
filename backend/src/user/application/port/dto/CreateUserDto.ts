export class CreateUserDto {
  account: string;
  password: string;

  constructor(account: string, password: string) {
    this.account = account;
    this.password = password;
  }
}
