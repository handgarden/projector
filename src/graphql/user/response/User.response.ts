import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/core/entity/domain/user/User.entity';

@ObjectType(User.name)
export class UserResponse {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  account: string;

  static fromEntity(user: User) {
    const model = new UserResponse();
    model.id = user.id.toString();
    model.account = user.account;

    return model;
  }
}
