export default function usePixelParser() {
  const parse = (val?: number | string) => {
    return typeof val === "number" ? `${val}px` : val;
  };

  return {
    parse,
  };
}
