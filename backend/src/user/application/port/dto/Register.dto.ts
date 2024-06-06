export class RegisterDto {
  account: string;
  password: string;

  constructor({ account, password }: { account: string; password: string }) {
    this.account = account;
    this.password = password;
  }
}
