import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { GetProjectsQuery } from "../../../gql/graphql";
import { useState } from "react";
import { OpenLinkButton } from "../../../common/components/button/OpenLinkButton";
import Image from "next/image";

type Props = {
  project: GetProjectsQuery["projects"]["items"][number];
};

const ELLIPSIS_LENGTH = 300;

export function ProjectListItem({ project }: Props) {
  const [ellipsisLength, setEllipsisLength] = useState(ELLIPSIS_LENGTH);

  return (
    <Card className="my-4 mx-auto py-4 w-full max-w-[1024px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-large break-all pr-2">{project.title}</h3>
          <OpenLinkButton path={`/projects/${project.id}`} />
        </div>
        {project.thumbnail && (
          <div className="w-full h-96 max-h-[512px] relative my-4">
            <Image
              src={project.thumbnail}
              alt="project thumbnail"
              className="object-contain rounded h-full w-auto mx-auto"
              width={400}
              height={300}
              unoptimized
            />
          </div>
        )}
      </CardHeader>
      <CardBody>
        <small className="pl-1 text-default-500 break-all">
          {project.description.slice(0, ellipsisLength)}
          {project.description.length > ellipsisLength ? (
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => {
                setEllipsisLength(project.description.length);
              }}
            >
              more
            </span>
          ) : null}
        </small>
      </CardBody>
    </Card>
  );
}
