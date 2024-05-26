import { Button } from "@nextui-org/react";
import { FiTrash } from "react-icons/fi";
import { DEFAULT_MESSAGE_KR } from "../../message/Default.message";

type Props = {
  onDelete: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function DeleteItemButton({ onDelete, size = "sm", className }: Props) {
  return (
    <Button size={size} onClick={onDelete} className={className}>
      <FiTrash />
      {DEFAULT_MESSAGE_KR.button.delete}
    </Button>
  );
}
