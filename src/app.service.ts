import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/domain/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
