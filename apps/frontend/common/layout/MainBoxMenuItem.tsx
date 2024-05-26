"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useHover } from "../hook/useHover";
import { mclsx } from "../../utils/mclsx";
import { useIsDark } from "../hook/useIsDark";

type Props = {
  path: string;
  exact?: boolean;
  label: string;
};

export function MainBoxMenuItem({ path, exact, label }: Props) {
  const pathname = usePathname();

  const isExact = exact ? pathname === path : pathname.startsWith(path);

  const router = useRouter();

  const { ref, isHovered } = useHover<HTMLButtonElement>();

  const isDark = useIsDark();

  const color = isDark ? "bg-zinc-700" : "bg-zinc-200";

  return (
    <button
      ref={ref}
      onClick={() => router.push(path)}
      className={mclsx(
        "w-[90%] h-8 flex items-center justify-start text-small rounded pl-[10px] mx-auto my-3",
        isExact ? color : "",
        isHovered ? color : ""
      )}
    >
      {label}
    </button>
  );
}
