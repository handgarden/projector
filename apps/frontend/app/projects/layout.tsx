import { Metadata } from "next";
import { AuthGuard } from "../../common/components/AuthGuard";
import { MainBox } from "../../common/layout/MainBox";
import { ContentBox } from "../../common/layout/ContentBox";
import { MainBoxMenuItem } from "../../common/layout/MainBoxMenuItem";

export const metadata: Metadata = {
  title: "Projector - Project Page",
  description: "Profile page for Projector application",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <MainBox hasContent title="프로젝트">
        <MainBoxMenuItem exact path="/projects" label="목록" />
        <MainBoxMenuItem path="/projects/create" label="생성" />
      </MainBox>
      <ContentBox>{children}</ContentBox>
    </AuthGuard>
  );
}
