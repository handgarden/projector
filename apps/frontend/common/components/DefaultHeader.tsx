export function DefaultHeader({
  children,
}: {
  children: React.ReactNode | string;
}) {
  return (
    <header className="p-4">
      <h2 className="text-2xl text-center my-5 font-bold">{children}</h2>
    </header>
  );
}
