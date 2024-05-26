"use client";
import { Button, Input } from "@nextui-org/react";
import { FormLabel } from "../../../common/components/form/FormLabel";
import { SLIDE_MESSAGE } from "../../../common/message/Slide.message";
import { SimpleCarousel } from "../../../common/components/carousel/SimpleCarousel";
import { UploadImage } from "../../../common/components/UploadImage";
import { useState } from "react";
import TextEditor from "../../../common/components/TextEditor";
import { GetSlideQuery, UpdateSlideInput } from "../../../gql/graphql";
import { UploadFileType } from "../../../types/file/UploadFileType";
import useSlideValidation from "../hook/useSlideValidation";
import { DeleteItemButton } from "../../../common/components/button/DeleteItemButton";
import { FormErrorText } from "../../../common/components/form/FormErrorText";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";

type SlideFormData = Omit<UpdateSlideInput, "images"> & {
  images: UploadFileType[];
};

type Props = {
  projectId: number;
  initialSlide: GetSlideQuery["slide"];
  onSubmit: (slide: GetSlideQuery["slide"]) => void;
};

export default function UpdateSlideForm({
  projectId,
  onSubmit,
  initialSlide,
}: Props) {
  const [slide, setSlide] = useState<SlideFormData>({
    ...initialSlide,
    slideId: initialSlide.id.toString(),
    projectId: projectId,
    images: [...initialSlide.images]
      .sort((a, b) => a.seq - b.seq)
      .map((f) => ({
        key: f.file.key,
        originalName: f.file.originalName,
        url: f.file.url,
      })),
  });

  const { validate, validationMessage, clearMessage } = useSlideValidation();

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const submit = () => {
    if (!slide) return;
    const isValid = validate(slide);
    if (!isValid) {
      return;
    }
    const slideInput: GetSlideQuery["slide"] = {
      ...slide,
      id: initialSlide.id,
      seq: initialSlide.seq,
      images: slide.images.map((f, i) => ({
        seq: i + 1,
        file: {
          key: f.key,
          originalName: f.originalName,
          url: f.url,
        },
      })),
    };

    onSubmit(slideInput);
  };

  return (
    <div>
      <div className="mb-4">
        <FormLabel value={SLIDE_MESSAGE.slide.images} isFocused={false} />
        <SimpleCarousel urls={slide.images.map((f) => f.url)} />
        <UploadImage
          onChange={(files) => {
            setSlide((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                images: [
                  ...prev.images,
                  ...files.map((f) => ({
                    key: f.key,
                    originalName: f.originalName,
                    url: f.url,
                  })),
                ],
              };
            });
            if (files.length) {
              clearMessage("images");
            }
          }}
        />
        {slide.images.map((f) => (
          <div
            key={f.key}
            className="flex w-full justify-between items-center py-1"
          >
            <p className="text-sm">{f.originalName}</p>
            <DeleteItemButton
              onDelete={() => {
                {
                  setSlide((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      images: prev.images.filter((i) => i.key !== f.key),
                    };
                  });
                }
              }}
            />
          </div>
        ))}
        {validationMessage.images && (
          <FormErrorText>{validationMessage.images}</FormErrorText>
        )}
      </div>
      <div className="mb-4">
        <FormLabel
          value={SLIDE_MESSAGE.slide.title}
          isFocused={isTitleFocused}
        />
        <Input
          value={slide.title}
          onChange={(e) => {
            const value = e.target.value;
            setSlide((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                title: value,
              };
            });
            if (value.length) {
              clearMessage("title");
            }
          }}
          onFocus={() => {
            setIsTitleFocused(true);
          }}
          onBlur={() => {
            setIsTitleFocused(false);
          }}
        />
        {validationMessage.title && (
          <FormErrorText>{validationMessage.title}</FormErrorText>
        )}
      </div>
      <div>
        <FormLabel
          value={SLIDE_MESSAGE.slide.description}
          isFocused={isDescriptionFocused}
        />
        <TextEditor
          value={slide.description}
          onFocus={() => {
            setIsDescriptionFocused(true);
          }}
          onBlur={() => {
            setIsDescriptionFocused(false);
          }}
          onChange={(v) => {
            setSlide((prev) => {
              if (!prev) return prev;

              return {
                ...prev,
                description: v,
              };
            });
            if (v.length) {
              clearMessage("description");
            }
          }}
        />
        {validationMessage.description && (
          <FormErrorText>{validationMessage.description}</FormErrorText>
        )}
      </div>
      <Button fullWidth onClick={submit} className="mt-4">
        {DEFAULT_MESSAGE_KR.button.update}
      </Button>
    </div>
  );
}
