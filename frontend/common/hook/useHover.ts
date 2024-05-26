import { useEffect, useRef, useState } from "react";

export function useHover<T extends Element>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.addEventListener("mouseenter", () => setIsHovered(true));
      elem.addEventListener("mouseleave", () => setIsHovered(false));
    }
    return () => {
      if (elem) {
        elem.removeEventListener("mouseenter", () => setIsHovered(true));
        elem.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  });

  return { isHovered, ref };
}
