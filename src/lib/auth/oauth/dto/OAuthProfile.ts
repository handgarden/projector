import { Nil } from '../../../../common/nil/Nil';
import { OAuthProvider } from '../../../../core/entity/enum/OAuthProvider';
import { GithubProfile } from '../github/GithubProfile';

export class OAuthProfileDto {
  id: string;
  name: string;
  email: Nil<string>;
  provider: OAuthProvider;

  static fromGithub(githubProfile: GithubProfile) {
    const profile = new OAuthProfileDto();
    profile.id = githubProfile.id.toString();
    profile.name = githubProfile.name;
    profile.email = Nil.of(githubProfile.email);
    profile.provider = OAuthProvider.GITHUB;

    return profile;
  }
}
