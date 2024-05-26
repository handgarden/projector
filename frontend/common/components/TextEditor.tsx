import { Editor } from "@tinymce/tinymce-react";
import useUploadFile from "../hook/useUploadFile";
import { progress } from "framer-motion";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function TextEditor({
  onChange,
  value,
  onBlur,
  onFocus,
}: Props) {
  const upload = useUploadFile();
  return (
    <Editor
      value={value}
      tinymceScriptSrc={"/tinymce/tinymce.min.js"}
      onEditorChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      init={{
        license_key: "gpl" as any,
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        images_upload_url: process.env.NEXT_PUBLIC_API_URL + "/files/upload",
        images_upload_credentials: true,
        images_upload_handler: async (f, progress) => {
          const res = await upload(f, progress);
          return res.url;
        },
        toolbar:
          "undo redo | blocks | " +
          "code image media | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}

