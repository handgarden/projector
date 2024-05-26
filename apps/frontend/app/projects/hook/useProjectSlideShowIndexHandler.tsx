import { useCallback, useEffect, useState } from "react";
import { GetProjectQuery } from "../../../gql/graphql";

type Props = {
  project: GetProjectQuery["project"];
};

export function useProjectSlideShowIndexHandler({ project }: Props) {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const handleSlidePrev = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  }, []);

  const handleSlideNext = useCallback(() => {
    setSlideIndex((prev) =>
      prev + 1 > project.slides.length - 1
        ? project.slides.length - 1
        : prev + 1
    );
  }, [project.slides.length]);

  const handleImagePrev = useCallback(() => {
    setImageIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  }, []);

  const handleImageNext = useCallback(() => {
    setImageIndex((prev) =>
      prev + 1 > project.slides[slideIndex].images.length - 1
        ? project.slides[slideIndex].images.length - 1
        : prev + 1
    );
  }, [project.slides, slideIndex]);

  const handleNext = useCallback(() => {
    const hasNextSlide = slideIndex < project.slides.length - 1;
    const hasNextImage =
      imageIndex < project.slides[slideIndex].images.length - 1;
    if (!hasNextSlide && !hasNextImage) {
      return;
    }
    if (imageIndex === project.slides[slideIndex].images.length - 1) {
      handleSlideNext();
      setImageIndex(0);
      return;
    }
    handleImageNext();
  }, [
    handleImageNext,
    handleSlideNext,
    imageIndex,
    project.slides,
    slideIndex,
  ]);

  const handlePrev = useCallback(() => {
    const hasPrevSlide = slideIndex > 0;
    const hasPrevImage = imageIndex > 0;
    if (!hasPrevSlide && !hasPrevImage) {
      return;
    }
    if (imageIndex === 0) {
      handleSlidePrev();
      setImageIndex(project.slides[slideIndex].images.length - 1);
      return;
    }
    handleImagePrev();
  }, [
    handleImagePrev,
    handleSlidePrev,
    imageIndex,
    project.slides,
    slideIndex,
  ]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleNext, handlePrev]);

  return {
    slideIndex,
    imageIndex,
    setSlideIndex,
    setImageIndex,
  };
}
