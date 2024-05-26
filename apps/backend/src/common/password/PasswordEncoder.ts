export interface PasswordEncoder {
  encode(password: string, saltOrRound?: number): Promise<string>;
  matches(password: string, encodedPassword: string): Promise<boolean>;
}

export const PasswordEncoder = Symbol('PasswordEncoder');
