import { GitHubButton } from "../../../../common/components/button/GitHubButton";
import { useOAuthRegisterStore } from "../../../../store/useOAuthRegisterStore";
import { OAuthProvider } from "../../../../gql/graphql";
import { useRouter } from "next/navigation";

type Props = {
  refetchOAuth: () => void;
};

export function GitHubAccountUnlinkButton({ refetchOAuth }: Props) {
  const [unregister, error] = useOAuthRegisterStore((state) => [
    state.unregister,
    state.error,
  ]);
  const onClick = async () => {
    await unregister(OAuthProvider.Github);
    refetchOAuth();
  };
  return (
    <>
      <GitHubButton fullWidth className="mt-4" onClick={onClick}>
        Github 계정 연결 해제
      </GitHubButton>
      {error && <p className="text-small text-red-400 mt-4">{error}</p>}
    </>
  );
}
