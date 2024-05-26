import { Permutations } from '../../../../util/UtilityTypes';

export const GITHUB_AUTH_SCOPE = {
  repo: {
    status: 'repo:status',
    deployment: 'repo_deployment',
    public_repo: 'public_repo',
  },
  repo_hook: {
    read: 'read:repo_hook',
    write: 'write:repo_hook',
  },
  org: {
    read: 'read:org',
    write: 'write:org',
  },
  gist: 'gist',
  user: {
    read: 'read:user',
    email: 'user:email',
    follow: 'user:follow',
  },
} as const;

type GithubAuthScopeType =
  | (typeof GITHUB_AUTH_SCOPE)['repo'][keyof (typeof GITHUB_AUTH_SCOPE)['repo']]
  | (typeof GITHUB_AUTH_SCOPE)['repo_hook'][keyof (typeof GITHUB_AUTH_SCOPE)['repo_hook']]
  | (typeof GITHUB_AUTH_SCOPE)['org'][keyof (typeof GITHUB_AUTH_SCOPE)['org']]
  | (typeof GITHUB_AUTH_SCOPE)['gist']
  | (typeof GITHUB_AUTH_SCOPE)['user'][keyof (typeof GITHUB_AUTH_SCOPE)['user']];

type NestedGithubAuthScopeType = Permutations<GithubAuthScopeType, ','>;

export type GithubTokenResponse = {
  access_token: string;
  token_type: string;
  scope: NestedGithubAuthScopeType;
};
