import { Button } from "@nextui-org/react";
import { DEFAULT_MESSAGE_KR } from "../../message/Default.message";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

type Props = {
  size?: "sm" | "md" | "lg";
  path: string;
};

export function OpenLinkButton({ path, size = "sm" }: Props) {
  return (
    <Button
      size={size}
      as={Link}
      href={path}
      className="flex justify-center items-center"
    >
      {DEFAULT_MESSAGE_KR.navigate.open}
      <FiExternalLink className="font-bold text-md mb-[2px]" />
    </Button>
  );
}
