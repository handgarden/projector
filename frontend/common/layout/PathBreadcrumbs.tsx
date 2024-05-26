"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function PathBreadCrumbs() {
  const path = usePathname();
  const paths = path
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <Breadcrumbs>
      {paths.map((p, idx) => {
        return <BreadcrumbItem key={idx}>{p}</BreadcrumbItem>;
      })}
    </Breadcrumbs>
  );
}
