import { mclsx } from "../../../utils/mclsx";
import { useIsDark } from "../../hook/useIsDark";

type Props = {
  value: string;
  isFocused: boolean;
};

export function FormLabel({ value, isFocused }: Props) {
  const isDark = useIsDark();

  return (
    <label
      className={mclsx(
        "text-default-500 text-sm pb-2 block",
        isFocused ? (isDark ? "text-white" : "text-black") : ""
      )}
    >
      {value}
    </label>
  );
}
