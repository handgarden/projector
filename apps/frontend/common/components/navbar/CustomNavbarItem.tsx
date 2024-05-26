import { mclsx } from "../../../utils/mclsx";

export function CustomNavbarItem({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  return (
    <li
      className={mclsx(
        "flex justify-start items-center text-xl m-auto my-4 w-full",
        open ? "w-40" : "w-14"
      )}
    >
      {children}
    </li>
  );
}
