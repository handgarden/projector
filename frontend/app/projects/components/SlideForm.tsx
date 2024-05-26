import { useState } from "react";
import { CreateSlideInput } from "../../../gql/graphql";
import useSlideValidation from "../hook/useSlideValidation";
import { UploadImage } from "../../../common/components/UploadImage";
import { FormErrorText } from "../../../common/components/form/FormErrorText";
import { Button, Input } from "@nextui-org/react";
import TextEditor from "../../../common/components/TextEditor";
import { FormLabel } from "../../../common/components/form/FormLabel";
import { SLIDE_MESSAGE } from "../../../common/message/Slide.message";
import { UploadFileType } from "../../../types/file/UploadFileType";
import { DeleteItemButton } from "../../../common/components/button/DeleteItemButton";
import { DEFAULT_MESSAGE_KR } from "../../../common/message/Default.message";
import { SimpleCarousel } from "../../../common/components/carousel/SimpleCarousel";

type Props = {
  projectId: number;
  onSubmit: (slide: CreateSlideInput) => void;
  loading: boolean;
};

type SlideFormData = Omit<CreateSlideInput, "images"> & {
  images: UploadFileType[];
};

export function SlideForm({ onSubmit, projectId, loading }: Props) {
  const [slide, setSlide] = useState<SlideFormData>({
    projectId: projectId,
    title: "",
    description: "",
    images: [],
  });

  const { validate, validationMessage, clearMessage } = useSlideValidation();

  const submit = () => {
    const isValid = validate(slide);
    if (!isValid) {
      return;
    }
    const slideInput: CreateSlideInput = {
      ...slide,
      images: slide.images.map((f, i) => {
        return {
          key: f.key,
          seq: i + 1,
        };
      }),
    };

    onSubmit(slideInput);
  };

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <FormLabel value={SLIDE_MESSAGE.slide.images} isFocused={false} />
        <SimpleCarousel urls={slide.images.map((f) => f.url)} />
        <UploadImage
          onChange={(files) => {
            setSlide((prev) => ({
              ...prev,
              images: [...prev.images, ...files],
            }));
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
                  setSlide((prev) => ({
                    ...prev,
                    images: prev.images.filter((i) => i.key !== f.key),
                  }));
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
            setSlide((prev) => ({
              ...prev,
              title: value,
            }));
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
            setSlide((prev) => ({
              ...prev,
              description: v,
            }));
            if (v.length) {
              clearMessage("description");
            }
          }}
        />
        {validationMessage.description && (
          <FormErrorText>{validationMessage.description}</FormErrorText>
        )}
      </div>
      <Button fullWidth onClick={submit} className="mt-4" isLoading={loading}>
        {DEFAULT_MESSAGE_KR.button.create}
      </Button>
    </div>
  );
}
