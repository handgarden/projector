import { UseReadQueryResult } from "@apollo/client";
import { GitHubOAuthButton } from "./GitHubOAuthButton";
import { GetProfileQuery, OAuthProvider } from "../../../../gql/graphql";
import { useMemo } from "react";

type Props = {
  oauthProfiles: GetProfileQuery["user"]["oauthProfiles"];
  refetchOAuth: () => void;
};

export function OAuthManagement({ oauthProfiles, refetchOAuth }: Props) {
  const isLinkedMap = useMemo(() => {
    return oauthProfiles.reduce((acc, cur) => {
      acc[cur.provider] = true;
      return acc;
    }, {} as Record<string, boolean>);
  }, [oauthProfiles]);

  return (
    <div className="">
      <h6 className="text-center font-bold">간편 로그인 관리</h6>
      <GitHubOAuthButton
        isLinked={isLinkedMap[OAuthProvider.Github]}
        refetchOAuth={refetchOAuth}
      />
    </div>
  );
}
