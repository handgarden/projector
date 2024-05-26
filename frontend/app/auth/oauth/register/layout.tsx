import { AuthGuard } from "../../../../common/components/AuthGuard";
import { MainBox } from "../../../../common/layout/MainBox";

export default function OAuthRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MainBox>{children}</MainBox>
    </AuthGuard>
  );
}
