import { Button } from "@nextui-org/react";
import { IoImageOutline } from "react-icons/io5";
import { DEFAULT_MESSAGE_KR } from "../message/Default.message";
import { useRef } from "react";
import useUploadFile from "../hook/useUploadFile";
import { UploadFileType } from "../../types/file/UploadFileType";
import { FileFormValidationMessage } from "../message/validation/FileFormValidation.message";
type Props = {
  onChange: (d: UploadFileType[]) => void;
  multiple?: boolean;
  max?: number;
};

export function UploadImage({ onChange, multiple = false, max }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useUploadFile();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (max && e.target.files.length > max) {
      alert(FileFormValidationMessage.MAX.replace("${max}", max.toString()));
      return;
    }

    const rawFiles = Array.from(e.target.files);

    const uploadedFiles: UploadFileType[] = [];
    for (const file of rawFiles) {
      const uploadedFile = await upload(
        {
          blob: () => file,
          filename: () => file.name,
        } as any,
        () => {}
      );
      uploadedFiles.push(uploadedFile);
    }

    onChange(uploadedFiles);
  };

  return (
    <div>
      <Button
        size="sm"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
      >
        <IoImageOutline />
        <span>{DEFAULT_MESSAGE_KR.button.upload}</span>
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={handleUpload}
        accept="image/*"
      />
    </div>
  );
}
