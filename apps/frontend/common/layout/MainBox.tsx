"use client";
import { mclsx } from "../../utils/mclsx";
import { useIsDark } from "../hook/useIsDark";

export function MainBox({
  children,
  hasContent: hasContent = false,
  title,
}: {
  children: React.ReactNode;
  hasContent?: boolean;
  title?: string;
}) {
  const isDark = useIsDark();

  return (
    <main
      className={mclsx(
        "flex justify-center h-full overflow-y-auto",
        hasContent ? "w-72" : "w-full",
        hasContent && "border-r-1",
        hasContent && isDark ? "border-r-gray-800" : "border-r-gray-200",
        !hasContent && "p-8"
      )}
    >
      <div className={mclsx("h-full w-full", !hasContent && "pt-8")}>
        {title && (
          <h2
            className={mclsx(
              "text-l font-bold px-4 pt-5 pb-4 border-b-1",
              isDark ? "border-b-gray-800" : "border-b-gray-200"
            )}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </main>
  );
}
