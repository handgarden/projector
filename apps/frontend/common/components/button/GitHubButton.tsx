import { Button, ButtonProps } from "@nextui-org/react";
import { GitHubIcon } from "../icon/GitHubIcon";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function GitHubButton(
  props: ButtonProps & { children?: React.ReactNode }
) {
  return (
    <Button
      {...props}
      className={twMerge(
        clsx(
          props.className,
          "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200"
        )
      )}
    >
      <GitHubIcon />
      {props.children}
    </Button>
  );
}
