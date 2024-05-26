import { Injectable } from '@nestjs/common';
import { PasswordEncoder } from './PasswordEncoder';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordEncoder implements PasswordEncoder {
  async encode(password: string, saltOrRound?: number): Promise<string> {
    // Implementation of the password encoding logic
    return bcrypt.hash(password, saltOrRound ?? 10);
  }

  async matches(password: string, encodedPassword: string): Promise<boolean> {
    // Implementation of the password matching logic
    return bcrypt.compare(password, encodedPassword);
  }
}
