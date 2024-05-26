import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { DEFAULT_MESSAGE_KR } from "../../message/Default.message";

type Props = {
  size?: "sm" | "md" | "lg";
  path: string;
};

export function EditLinkButton({ path, size = "sm" }: Props) {
  return (
    <Button as={Link} href={path} size={size}>
      <FiEdit />
      {DEFAULT_MESSAGE_KR.button.update}
    </Button>
  );
}
