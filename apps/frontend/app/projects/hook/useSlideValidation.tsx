import { useState } from "react";
import { DefaultValidationMessage } from "../../../common/message/validation/DefaultValidation.message";
import { UploadFileType } from "../../../types/file/UploadFileType";

export default function useSlideValidation() {
  const [validationMessage, setValidationMessage] = useState({
    title: "",
    description: "",
    images: "",
  });

  const validate = (slide: {
    title: string;
    description: string;
    images: UploadFileType[];
  }) => {
    const isTitleValid = slide.title.length > 0 && slide.title.length <= 254;
    if (!isTitleValid) {
      setValidationMessage((prev) => ({
        ...prev,
        // eslint-disable-next-line no-template-curly-in-string
        title: DefaultValidationMessage.LENGTH.replace("${min}", "1").replace(
          // eslint-disable-next-line no-template-curly-in-string
          "${max}",
          "254"
        ),
      }));
    }

    const isDescriptionValid = slide.description.length > 0;
    if (!isDescriptionValid) {
      setValidationMessage((prev) => ({
        ...prev,
        description: DefaultValidationMessage.REQUIRED,
      }));
    }

    if (!isTitleValid || !isDescriptionValid) {
      return false;
    }

    return true;
  };

  const clearMessage = (key: keyof typeof validationMessage) => {
    setValidationMessage((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return {
    validationMessage,
    validate,
    clearMessage,
  };
}
