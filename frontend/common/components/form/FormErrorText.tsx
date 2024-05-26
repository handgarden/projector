import { ReactElement } from "react";

export function FormErrorText({
  children,
}: {
  children?: ReactElement | string;
}) {
  if (!children) return null;

  return <p className="text-sm text-red-500 my-4">{children}</p>;
}
