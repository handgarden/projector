import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OAuthProfile } from '../../../core/entity/domain/user/OAuthProfile.entity';
import { OAuthProvider } from '../../../core/entity/enum/OAuthProvider';

registerEnumType(OAuthProvider, {
  name: 'OAuthProvider',
  description: 'OAuth provider',
});

@ObjectType(OAuthProfile.name)
export class OAuthProfileModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => OAuthProvider)
  provider: OAuthProvider;

  static fromEntity(entity: OAuthProfile) {
    const model = new OAuthProfileModel();
    model.id = entity.id;
    model.name = entity.username;
    model.email = entity.email;
    model.provider = entity.provider;

    return model;
  }
}