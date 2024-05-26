import Link from "next/link";
import { GitHubButton } from "../../../common/components/button/GitHubButton";
import { useDomain } from "../../../common/hook/useDomain";

type Props = {
  disabled?: boolean;
};

export function GitHubLoginButton({ disabled }: Props) {
  const domain = useDomain();
  return (
    <GitHubButton
      fullWidth
      as={Link}
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=read:user,user:email&redirect_uri=${domain}/auth/oauth/login?provider=github`}
      className="mt-4"
      disabled={disabled}
    >
      GitHub 로그인
    </GitHubButton>
  );
}
