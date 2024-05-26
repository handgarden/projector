"use client";

import { Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { DEFAULT_MESSAGE_KR } from "../../message/Default.message";

type Props = {
  size?: "sm" | "md" | "lg";
  path: string;
};

export function BackLinkButton({ size = "sm", path }: Props) {
  return (
    <Button size={size} as={Link} href={path}>
      <IoIosArrowBack />
      {DEFAULT_MESSAGE_KR.navigate.back}
    </Button>
  );
}
