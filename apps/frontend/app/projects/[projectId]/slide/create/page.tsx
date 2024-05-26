"use client";
import { useParams, useRouter } from "next/navigation";
import { CreateSlideInput } from "../../../../../gql/graphql";
import useProjectQuery from "../../../hook/useProjectQuery";
import useSlideCreate from "../../../hook/useSlideCreate";
import { useProjectStore } from "../../../../../store/useProjectStore";
import usePathUtils from "../../../../../common/hook/usePathUtils";
import { PROJECT_PATH } from "../../../../../common/path/ProjectPath";
import { Progress } from "@nextui-org/react";
import { DefaultHeader } from "../../../../../common/components/DefaultHeader";
import { SLIDE_MESSAGE } from "../../../../../common/message/Slide.message";
import { SlideForm } from "../../../components/SlideForm";
import { BackLinkButton } from "../../../../../common/components/button/BackLinkButton";

export default function CreateSlidePage() {
  const { projectId } = useParams();

  const { project, loading } = useProjectQuery({
    projectId: projectId as string,
  });

  const { mutate } = useSlideCreate();

  const addSlide = useProjectStore((state) => state.addNewSlide);
  const router = useRouter();
  const { replaceParamPath } = usePathUtils();

  const onSubmit = (data: CreateSlideInput) => {
    if (!project) return;
    mutate({
      variables: {
        input: data,
      },
      onCompleted: (d) => {
        addSlide({
          ...d.createSlide,
        });

        router.push(
          replaceParamPath(PROJECT_PATH.details, { projectId: project.id })
        );
      },
      onError(e) {
        alert("Slide 생성에 실패했습니다.");
      },
    });
  };

  if (!projectId || isNaN(Number(projectId))) {
    router.push("/404");
    return null;
  }

  if (loading || !project) {
    return <Progress aria-label="slide progress" isIndeterminate />;
  }

  return (
    <div className="w-full p-4 max-w-[1024px] mx-auto">
      <div>
        <BackLinkButton
          path={replaceParamPath(PROJECT_PATH.details, {
            projectId: projectId.toString(),
          })}
        />
      </div>
      <DefaultHeader>{SLIDE_MESSAGE.title.create}</DefaultHeader>
      <SlideForm projectId={parseInt(project.id)} onSubmit={onSubmit} />
    </div>
  );
}
