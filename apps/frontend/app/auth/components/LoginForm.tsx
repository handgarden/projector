"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";
import { StateStatus } from "../../../types/common/StateStatus.type";
import { AuthValidationMessage } from "../../../common/message/validation/AuthValidation.message";
import { useForm } from "react-hook-form";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";
import { useState } from "react";
import { AUTH_MESSAGE_KR } from "../../../common/message/Auth.message";
import { GitHubLoginButton } from "./GithubLoginButton";

type Props = {
  onSubmit: (data: LoginRequest) => void;
  error: string | null;
  loading: boolean;
};

export default function LoginForm({ onSubmit, loading, error }: Props) {
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const { register, handleSubmit } = useForm<LoginRequest>();

  const onSubmitForm = (data: LoginRequest) => {
    if (data.account.length < 4 || data.account.length > 20) {
      setIsFormValid(false);
      return;
    }

    if (data.password.length < 8 || data.password.length > 20) {
      setIsFormValid(false);
      return;
    }

    if (!data.account.match(/^[a-zA-Z0-9]+$/)) {
      setIsFormValid(false);
      return;
    }

    if (!data.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
      setIsFormValid(false);
      return;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        label={AUTH_MESSAGE_KR.label.login.account}
        type="text"
        {...register("account", {
          required: DefaultValidationMessage.REQUIRED,
        })}
      />
      <Input
        label={AUTH_MESSAGE_KR.label.login.password}
        type="password"
        {...register("password", {
          required: DefaultValidationMessage.REQUIRED,
        })}
        className="my-4"
      />
      <Button type="submit" isLoading={loading} fullWidth>
        {AUTH_MESSAGE_KR.button.login}
      </Button>
      {(error || !isFormValid) && (
        <p className="text-small text-red-400 mt-4">
          {error ?? AuthValidationMessage.LOGIN_FAILURE}
        </p>
      )}
      <GitHubLoginButton disabled={loading} />
      <Button
        href="/auth/register"
        as={Link}
        disabled={loading}
        fullWidth
        className="my-4"
      >
        {AUTH_MESSAGE_KR.button.register}
      </Button>
    </form>
  );
}
