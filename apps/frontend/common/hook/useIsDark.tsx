"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useIsDark() {
  const { theme } = useTheme();

  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  return isDark;
}
