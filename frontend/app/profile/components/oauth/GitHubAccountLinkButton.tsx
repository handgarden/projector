import Link from "next/link";
import { GitHubButton } from "../../../../common/components/button/GitHubButton";
import { useDomain } from "../../../../common/hook/useDomain";

export function GitHubAccountLinkButton() {
  const domain = useDomain();
  return (
    <GitHubButton
      fullWidth
      as={Link}
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=read:user,user:email&redirect_uri=${domain}/auth/oauth/register?provider=github`}
      className="mt-4"
    >
      Github 계정 연결
    </GitHubButton>
  );
}
