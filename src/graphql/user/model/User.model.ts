import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/core/entity/domain/user/User.entity';

@ObjectType(User.name)
export class UserModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  account: string;

  static fromEntity(user: User) {
    const model = new UserModel();
    model.id = user.id.toString();
    model.account = user.account;

    return model;
  }
}
