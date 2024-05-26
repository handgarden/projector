import { EditorBlobInfoType } from "../../types/file/EditorBlobInfoType";
import { ProgressFnType } from "../../types/file/ProgressFnType";
import { UploadFileType } from "../../types/file/UploadFileType";
import { JwtTokenUtils } from "../../utils/JwtTokenUtils";
import { post } from "../axios";

export default function useUploadFile() {
  const token = JwtTokenUtils.getToken();
  const upload = async (f: EditorBlobInfoType, progressFn: ProgressFnType) => {
    if (!token) {
      throw Error("로그인이 필요합니다.");
    }
    const form = new FormData();
    form.append("files", f.blob(), f.filename());
    const response = await post<FormData, UploadFileType[]>(
      "/files/upload",
      form,
      token,
      "multipart/form-data"
    );

    if (!response.data?.length) {
      throw Error("업로드 실패");
    }

    progressFn(100);
    return response.data[0]!;
  };

  return upload;
}
