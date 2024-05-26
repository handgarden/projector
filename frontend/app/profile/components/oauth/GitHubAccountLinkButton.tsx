import Link from "next/link";
import { GitHubButton } from "../../../../common/components/button/GitHubButton";

export function GitHubAccountLinkButton() {
  return (
    <GitHubButton
      fullWidth
      as={Link}
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=read:user,user:email&redirect_uri=http://localhost:3000/auth/oauth/register?provider=github`}
      className="mt-4"
    >
      Github 계정 연결
    </GitHubButton>
  );
}
