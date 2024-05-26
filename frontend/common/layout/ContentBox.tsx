"use client";
import { mclsx } from "../../utils/mclsx";
import { PathBreadCrumbs } from "./PathBreadcrumbs";
import { useIsDark } from "../hook/useIsDark";

export function ContentBox({ children }: { children: React.ReactNode }) {
  const isDark = useIsDark();

  const borderColor = isDark ? "border-b-gray-800" : "border-b-gray-200";

  return (
    <aside className="w-[calc(100%+1rem)] overflow-y-auto">
      <div className={mclsx("px-4 pt-5 pb-5 border-b-1", borderColor)}>
        <PathBreadCrumbs />
      </div>
      <div className="p-4">{children}</div>
    </aside>
  );
}
