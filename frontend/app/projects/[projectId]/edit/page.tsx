"use client";
import { useParams, useRouter } from "next/navigation";
import useProjectQuery from "../../hook/useProjectQuery";
import usePathUtils from "../../../../common/hook/usePathUtils";
import useProjectUpdate from "../../hook/useProjectUpdate";
import { BackLinkButton } from "../../../../common/components/button/BackLinkButton";
import { PROJECT_PATH } from "../../../../common/path/ProjectPath";
import ProjectForm from "../../components/ProjectForm";
import { DefaultHeader } from "../../../../common/components/DefaultHeader";
import { useProjectStore } from "../../../../store/useProjectStore";
import { PROJECT_MESSAGE } from "../../../../common/message/Project.message";

export default function ProjectEditPage() {
  const { projectId } = useParams();

  const { project } = useProjectQuery({ projectId: projectId as string });

  const { replaceParamPath } = usePathUtils();

  const { mutation } = useProjectUpdate();

  const updateProject = useProjectStore((state) => state.updateProject);

  const router = useRouter();

  if (!project) return null;

  return (
    <div className="w-full max-w-[1024px] mx-auto p-1">
      <div className="mb-4">
        {project && (
          <BackLinkButton
            path={replaceParamPath(PROJECT_PATH.details, {
              projectId: project.id as string,
            })}
          />
        )}
      </div>
      <DefaultHeader>{PROJECT_MESSAGE.title.update}</DefaultHeader>
      <ProjectForm
        onSubmit={(d) => {
          if (!project) return;
          mutation({
            variables: {
              projectId: project.id,
              input: d,
            },
            onCompleted: () => {
              const updated = {
                ...project,
                ...d,
              };
              updateProject({
                ...updated,
              });

              router.push(
                replaceParamPath(PROJECT_PATH.details, {
                  projectId: projectId as string,
                })
              );
            },
          });
        }}
        initialValues={project ?? undefined}
      />
    </div>
  );
}
