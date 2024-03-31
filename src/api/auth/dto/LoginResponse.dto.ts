export class LoginResponseDto {
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
