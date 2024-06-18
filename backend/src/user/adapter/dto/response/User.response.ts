import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/domain/User.entity';
import { UserDto } from '../../../application/dto/User.dto';

@ObjectType(User.name)
export class UserResponse {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  account: string;

  static fromDto(dto: UserDto): UserResponse {
    const model = new UserResponse();
    model.id = dto.id.toString();
    model.account = dto.account;
    return model;
  }
}
