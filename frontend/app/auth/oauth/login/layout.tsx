import { Suspense } from "react";
import { MainBox } from "../../../../common/layout/MainBox";

export default function OAuthLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainBox>
      <Suspense>{children}</Suspense>
    </MainBox>
  );
}
