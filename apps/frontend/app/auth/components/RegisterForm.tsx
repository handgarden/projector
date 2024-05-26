"use client";

import { Button, Input } from "@nextui-org/react";
import { LoginRequest } from "../../../types/auth/LoginRequest.type";
import { useForm } from "react-hook-form";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";
import { AuthValidationMessage } from "../../../common/message/validation/AuthValidation.message";
import { AUTH_MESSAGE_KR } from "../../../common/message/Auth.message";
import { useRouter } from "next/navigation";
import { RegisterRequest } from "../../../types/auth/RegisterRequest.type";
import { useState } from "react";
import { RegisterFormType } from "../../../types/auth/RegisterForm.type";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { FormErrorText } from "../../../common/components/form/FormErrorText";

type Props = {
  onSubmit: (data: RegisterRequest) => void;
  loading: boolean;
  globalError: string;
};

export default function RegisterForm({
  onSubmit,
  loading,
  globalError,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const accountLengthMessage = DefaultValidationMessage.LENGTH.replace(
    "${min}",
    "4"
  ).replace("${max}", "20");

  const passwordLengthMessage = DefaultValidationMessage.LENGTH.replace(
    "${min}",
    "8"
  ).replace("${max}", "20");

  const router = useRouter();

  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const onSubmitForm = (data: RegisterFormType) => {
    if (data.password !== data.confirmPassword) {
      setConfirmMessage(AuthValidationMessage.CONFIRM_PASSWORD);
      return;
    }
    setConfirmMessage("");
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        label={AUTH_MESSAGE_KR.label.register.account}
        {...register("account", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
          minLength: {
            value: 4,
            message: accountLengthMessage,
          },
          maxLength: {
            value: 20,
            message: accountLengthMessage,
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: AuthValidationMessage.ACCOUNT_PATTERN,
          },
        })}
      />
      {errors.account && (
        <FormErrorText>{errors.account.message}</FormErrorText>
      )}
      <Input
        label={AUTH_MESSAGE_KR.label.register.password}
        type="password"
        className="my-4"
        {...register("password", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
            message: AuthValidationMessage.PASSWORD_PATTERN,
          },
          minLength: {
            value: 8,
            message: passwordLengthMessage,
          },
          maxLength: {
            value: 20,
            message: passwordLengthMessage,
          },
        })}
      />
      {errors.password && (
        <FormErrorText>{errors.password.message}</FormErrorText>
      )}
      <Input
        label={AUTH_MESSAGE_KR.label.register.confirmPassword}
        type="password"
        className="my-4"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: DefaultValidationMessage.REQUIRED,
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
            message: AuthValidationMessage.PASSWORD_PATTERN,
          },
          minLength: {
            value: 8,
            message: passwordLengthMessage,
          },
          maxLength: {
            value: 20,
            message: passwordLengthMessage,
          },
        })}
      />
      {errors.confirmPassword && (
        <FormErrorText>{errors.confirmPassword.message}</FormErrorText>
      )}
      {confirmMessage && <FormErrorText>{confirmMessage}</FormErrorText>}
      <Button isLoading={loading} fullWidth type="submit">
        {AUTH_MESSAGE_KR.button.register}
      </Button>
      {globalError && <p>{globalError}</p>}
      <Button onClick={() => router.back()} fullWidth className="my-4">
        {DEFAULT_MESSAGE_KR.navigate.back}
      </Button>
    </form>
  );
}
