import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OAuthProfile } from '../../domain/OAuthProfile.entity';
import { OAuthProvider } from '../../domain/OAuthProvider';
import { OAuthProfileDto } from '../../application/dto/OAuthProfile.dto';

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

  static fromDto(dto: OAuthProfileDto) {
    const model = new OAuthProfileResponse();
    model.id = dto.id;
    model.name = dto.name;
    model.email = dto.email;
    model.provider = dto.provider;

    return model;
  }
}
