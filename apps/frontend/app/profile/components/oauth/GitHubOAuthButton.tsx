import { GitHubAccountLinkButton } from "./GitHubAccountLinkButton";
import { GitHubAccountUnlinkButton } from "./GitHubAccountUnlinkButton";

type GitHubOAuthButtonProps = {
  isLinked: boolean;
  refetchOAuth: () => void;
};

export function GitHubOAuthButton({
  isLinked,
  refetchOAuth,
}: GitHubOAuthButtonProps) {
  if (isLinked) {
    return <GitHubAccountUnlinkButton refetchOAuth={refetchOAuth} />;
  }
  return <GitHubAccountLinkButton />;
}
