"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRegisterStore } from "../../../store/useRegisterStore";
import RegisterForm from "../components/RegisterForm";
import { AUTH_PATH } from "../../../common/path/AuthPath";
import usePathUtils from "../../../common/hook/usePathUtils";
import { StateStatus } from "../../../types/common/StateStatus.type";
import { API_MESSAGE_KR } from "../../../common/message/API.message";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";
import { ROOT_PATH } from "../../../common/path/RootPath";

export default function RegisterPage() {
  const [register, status, error] = useRegisterStore((state) => [
    state.register,
    state.status,
    state.error,
  ]);

  const query = useSearchParams();
  const redirect = query.get("redirect");
  const router = useRouter();

  const { createQueryPath } = usePathUtils();

  const onSubmit = (data: LoginRequest) => {
    register(data, () => {
      router.push(
        createQueryPath(AUTH_PATH.login, {
          redirect: redirect ?? ROOT_PATH.root,
        })
      );
    });
  };

  const isConstraintError = error && status === StateStatus.FAILURE;
  const isServerError = !error && status === StateStatus.FAILURE;
  const globalMessage = isConstraintError
    ? error[0].constraints[0].message
    : isServerError
    ? API_MESSAGE_KR.response.serverError
    : "";

  return (
    <>
      <RegisterForm
        onSubmit={onSubmit}
        loading={status === StateStatus.PENDING}
        globalError={globalMessage}
      />
    </>
  );
}
