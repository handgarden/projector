"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CustomNavbarItem } from "./CustomNavbarItem";
import { useIsDark } from "../../hook/useIsDark";
import { useTheme } from "next-themes";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useHover } from "../../hook/useHover";
type Props = {
  open: boolean;
};

export function CustomNavbarThemeSwitcher({ open }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = useIsDark();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const { ref, isHovered } = useHover<HTMLButtonElement>();

  if (!mounted) return null;

  return (
    <CustomNavbarItem open={open}>
      <button
        ref={ref}
        className={twMerge(
          clsx(
            "mx-2 pl-[10px] rounded h-10 flex items-center justify-start font-bold w-full",
            isHovered ? (isDark ? "bg-zinc-700" : "bg-zinc-200") : ""
          )
        )}
        onClick={handleThemeChange}
      >
        {theme === "light" ? (
          <IoMoon className="text-xl" />
        ) : (
          <IoSunny className="text-xl" />
        )}
        {open && <span className="ml-2 text-sm font-normal">Theme</span>}
      </button>
    </CustomNavbarItem>
  );
}
