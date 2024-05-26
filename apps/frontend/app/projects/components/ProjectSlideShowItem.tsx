import { useState } from "react";
import { SimpleCarousel } from "../../../common/components/carousel/SimpleCarousel";
import { GetProjectQuery } from "../../../gql/graphql";
import { Button } from "@nextui-org/react";
import { mclsx } from "../../../utils/mclsx";
import { useProjectSlideShowIndexHandler } from "../hook/useProjectSlideShowIndexHandler";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import {
  MdOutlineVerticalDistribute,
  MdOutlineHorizontalDistribute,
} from "react-icons/md";

type Props = {
  project: GetProjectQuery["project"];
};

export function ProjectSlideShowItem({ project }: Props) {
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");

  const { slideIndex, setSlideIndex, imageIndex, setImageIndex } =
    useProjectSlideShowIndexHandler({ project });

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={() => setSlideIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
          disabled={slideIndex === 0}
          size="sm"
        >
          <MdOutlineSkipPrevious className="text-lg" />
          {DEFAULT_MESSAGE_KR.button.prev}
        </Button>
        <Button
          onClick={() =>
            setLayout((prev) =>
              prev === "horizontal" ? "vertical" : "horizontal"
            )
          }
          size="sm"
          className="mx-4"
        >
          {layout === "horizontal" ? (
            <MdOutlineVerticalDistribute className="text-lg" />
          ) : (
            <MdOutlineHorizontalDistribute className="text-lg" />
          )}
          {layout === "horizontal"
            ? DEFAULT_MESSAGE_KR.button.vertical
            : DEFAULT_MESSAGE_KR.button.horizontal}
        </Button>
        <Button
          onClick={() =>
            setSlideIndex((prev) =>
              prev + 1 > project.slides.length - 1
                ? project.slides.length - 1
                : prev + 1
            )
          }
          disabled={slideIndex === project.slides.length - 1}
          size="sm"
        >
          <MdOutlineSkipNext className="text-lg" />
          {DEFAULT_MESSAGE_KR.button.next}
        </Button>
      </div>
      <h3 className="text-4xl font-bold break-all my-4 text-center">
        {project.slides[slideIndex].title}
      </h3>
      <div
        className={mclsx(
          "flex w-full h-full",
          layout === "horizontal" ? "flex-row" : "flex-col"
        )}
      >
        <div
          className={mclsx(
            "flex justify-center px-4",
            layout === "vertical"
              ? "w-full h-1/2 max-h-[40vh]"
              : "w-1/2 h-full max-h-[75vh]"
          )}
        >
          <SimpleCarousel
            urls={project.slides[slideIndex].images.map((i) => i.file.url)}
            outerIndex={{
              index: imageIndex,
              setIndex: setImageIndex,
            }}
            className={mclsx(
              "h-full",
              layout === "vertical" && "max-h-[38vh]",
              layout === "horizontal" && "max-h-[40vh]"
            )}
          />
        </div>
        <div
          className={mclsx(
            "p-4",
            layout === "vertical"
              ? "py-2 w-full h-1/2 max-h-[35vh]"
              : "w-1/2 h-full max-h-[75vh]"
          )}
        >
          <div
            className="break-all overflow-y-auto h-full"
            dangerouslySetInnerHTML={{
              __html: project.slides[slideIndex].description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
