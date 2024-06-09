import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OAuthProfile } from '../../domain/OAuthProfile.entity';
import { OAuthProvider } from '../../domain/OAuthProvider';

registerEnumType(OAuthProvider, {
  name: 'OAuthProvider',
  description: 'OAuth provider',
});

@ObjectType(OAuthProfile.name)
export class OAuthProfileResponse {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => OAuthProvider)
  provider: OAuthProvider;

  static fromEntity(entity: OAuthProfile) {
    const model = new OAuthProfileResponse();
    model.id = entity.id;
    model.name = entity.username;
    model.email = entity.email;
    model.provider = entity.provider;

    return model;
  }
}
