"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { CustomNavbarItem } from "./CustomNavbarItem";
import { useIsDark } from "../../hook/useIsDark";
import { useHover } from "../../hook/useHover";

type Props = {
  icon: React.ReactNode;
  path: string;
  exact?: boolean;
  label: string;
  open: boolean;
};

export function CustomNavbarLinkItem({
  icon,
  path,
  exact,
  label,
  open,
}: Props) {
  const pathname = usePathname();

  const isExact = exact ? pathname === path : pathname.startsWith(path);

  const router = useRouter();

  const isDark = useIsDark();

  const { ref, isHovered } = useHover<HTMLButtonElement>();

  return (
    <CustomNavbarItem open={open}>
      <button
        ref={ref}
        className={twMerge(
          clsx(
            "mx-2 pl-[10px] rounded h-10 flex items-center justify-start font-bold w-full",
            isExact ? (isDark ? "bg-zinc-700" : "bg-zinc-200") : "",
            isHovered ? (isDark ? "bg-zinc-700" : "bg-zinc-200") : ""
          )
        )}
        onClick={() => router.push(path)}
      >
        {typeof icon === "string" ? <span>{icon}</span> : icon}
        {open && <span className="ml-2 text-sm font-normal">{label}</span>}
      </button>
    </CustomNavbarItem>
  );
}
