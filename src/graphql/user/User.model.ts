import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entity/domain/User.entity';

@ObjectType(User.name)
export class UserModel implements Partial<Omit<User, 'id'>> {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  account: string;
}
