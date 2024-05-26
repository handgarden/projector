import Image from "next/image";
import { mclsx } from "../../../utils/mclsx";
import { Dispatch, SetStateAction, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useHover } from "../../hook/useHover";
type Props = {
  urls: string[];
  className?: string;
  outerIndex?: {
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
  };
};

export function SimpleCarousel({ urls, className, outerIndex }: Props) {
  const [curIndex, setCurIndex] = useState(0);

  const { ref: leftRef, isHovered: isLeftHovered } =
    useHover<HTMLButtonElement>();
  const { ref: rightRef, isHovered: isRightHovered } =
    useHover<HTMLButtonElement>();

  if (!urls.length) {
    return null;
  }
  return (
    <div
      className={mclsx("w-full h-96 max-h-[512px] relative my-4", className)}
    >
      <button
        ref={leftRef}
        className={mclsx(
          "absolute h-full flex justify-start items-center left-0 top-0 bottom-0 my-auto rounded w-[40%]",
          curIndex === 0 && "hidden",
          isLeftHovered && "bg-default-200 bg-opacity-50"
        )}
        onClick={() => {
          const handleIndex = (prev: number) => {
            if (prev === 0) {
              return prev;
            }
            return prev - 1;
          };
          outerIndex?.setIndex(handleIndex);
          setCurIndex(handleIndex);
        }}
      >
        <FaChevronLeft className="text-[2rem]" />
      </button>
      <button
        ref={rightRef}
        className={mclsx(
          "absolute h-full flex justify-end items-center right-0 top-0 bottom-0 my-auto rounded w-[40%]",
          curIndex === urls.length - 1 && "hidden",
          isRightHovered && "bg-default-200 bg-opacity-50"
        )}
        onClick={() => {
          const handleIndex = (prev: number) => {
            if (prev === urls.length - 1) {
              return prev;
            }
            return prev + 1;
          };
          outerIndex?.setIndex(handleIndex);
          setCurIndex(handleIndex);
        }}
      >
        <FaChevronRight className="text-[2rem]" />
      </button>
      <Image
        key={urls[outerIndex?.index ?? curIndex]}
        src={urls[outerIndex?.index ?? curIndex]}
        alt="carousel image"
        className={mclsx("object-contain rounded h-full w-auto mx-auto")}
        width={400}
        height={300}
        unoptimized
        priority
      />
    </div>
  );
}
