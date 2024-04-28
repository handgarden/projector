import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/entity/repository/User.repository';
import { UserModel } from './model/User.model';

@Injectable()
export class UserGqlService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: number) {
    const user = await this.userRepository.findById(id);

    if (user.isNil()) {
      throw new Error('User not found');
    }

    return UserModel.fromEntity(user.unwrap());
  }
}
