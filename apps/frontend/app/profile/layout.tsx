import { Metadata } from "next";
import { AuthGuard } from "../../common/components/AuthGuard";
import { MainBox } from "../../common/layout/MainBox";

export const metadata: Metadata = {
  title: "Projector - Profile Page",
  description: "Profile page for Projector application",
};
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MainBox>
        <h2 className="text-2xl text-center my-5 font-bold">프로필</h2>
        {children}
      </MainBox>
    </AuthGuard>
  );
}
