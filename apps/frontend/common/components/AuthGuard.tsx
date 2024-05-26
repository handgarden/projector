"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import usePathUtils from "../hook/usePathUtils";
import { ErrorMessage } from "../message/Error.message";
import { StateStatus } from "../../types/common/StateStatus.type";
import { Progress } from "@nextui-org/react";
import { AUTH_PATH } from "../path/AuthPath";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [status] = useAuthStore((state) => [state.status]);

  const router = useRouter();
  const { createQueryPath } = usePathUtils();
  const pathname = usePathname();

  const loginRedirectPath = createQueryPath(AUTH_PATH.login, {
    redirect: pathname,
  });

  if (status === StateStatus.FAILURE) {
    alert(ErrorMessage.auth.unAuthorized);
    router.push(loginRedirectPath);
    return null;
  }

  if (status === StateStatus.SUCCESS) {
    return children;
  }

  return (
    <div>
      <Progress size="sm" isIndeterminate aria-label="Loading..." />
    </div>
  );
}
