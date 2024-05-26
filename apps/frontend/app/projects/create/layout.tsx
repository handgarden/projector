import { AuthGuard } from "../../../common/components/AuthGuard";
import { DefaultHeader } from "../../../common/components/DefaultHeader";

export default function CreateProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DefaultHeader>프로젝트 생성</DefaultHeader>
      <div className="p-4 max-w-[1024px] mx-auto">{children}</div>
    </AuthGuard>
  );
}
