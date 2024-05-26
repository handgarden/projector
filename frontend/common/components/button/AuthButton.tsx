import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import usePathUtils from "../../hook/usePathUtils";
import { AUTH_PATH } from "../../path/AuthPath";
import { AUTH_MESSAGE_KR } from "../../message/Auth.message";
import { StateStatus } from "../../../types/common/StateStatus.type";
import { ROOT_PATH } from "../../path/RootPath";

type Props = {
  fullWidth?: boolean;
  variant?: "bordered" | "ghost";
  className?: string;
};

export function AuthButton({ fullWidth, variant, className }: Props) {
  const [status, logout] = useAuthStore((state) => [
    state.status,
    state.logout,
  ]);

  const router = useRouter();
  const { createQueryPath } = usePathUtils();
  const pathName = usePathname();
  const loginRedirectPath = createQueryPath(AUTH_PATH.login, {
    redirect: pathName,
  });

  if (status === StateStatus.SUCCESS) {
    return (
      <Button
        fullWidth={fullWidth}
        onClick={() => {
          logout();
          router.replace(ROOT_PATH.root);
          router.refresh();
        }}
        variant={variant}
        className={className}
      >
        {AUTH_MESSAGE_KR.button.logout}
      </Button>
    );
  }

  return (
    <Button
      as={Link}
      href={loginRedirectPath}
      variant={variant}
      fullWidth={fullWidth}
      className={className}
    >
      {AUTH_MESSAGE_KR.button.login}
    </Button>
  );
}
