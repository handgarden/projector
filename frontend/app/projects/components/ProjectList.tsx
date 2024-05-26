"use client";
import { CircularProgress } from "@nextui-org/react";
import useProjectListQuery from "../hook/useProjectListQuery";
import { ProjectListItem } from "./ProjectListItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GetProjectsQuery } from "../../../gql/graphql";
import { Pageable } from "../../../types/common/Pageable.type";
import { mclsx } from "../../../utils/mclsx";

export function ProjectList() {
  const [projects, setProjects] = useState<
    GetProjectsQuery["projects"]["items"]
  >([]);

  const [pageable, setPageable] = useState<Pageable>({
    size: 10,
    page: 1,
  });

  const { fetch, loading } = useProjectListQuery();
  const [hasNext, setHasNext] = useState<boolean>(true);

  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch({
      variables: pageable,
      onCompleted: (data) => {
        setProjects((prev) => [...prev, ...data.projects.items]);
        setHasNext(data.projects.hasNext);
      },
      onError: () => {
        router.push("/error");
      },
    });
  }, [fetch, router, pageable]);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !loading) {
        setPageable((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    },
    [loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 1,
      root: null,
    });
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  return (
    <div className={"min-h-[100vh+1rem] relative"}>
      {projects.map((p) => (
        <ProjectListItem key={p.id} project={p} />
      ))}
      <div
        ref={divRef}
        id="project-infinite"
        className={mclsx(
          "h-4 flex justify-center absolute bottom-0 left-0 w-full",
          !hasNext && "hidden"
        )}
      >
        {loading && <CircularProgress aria-label="project-loading" />}
      </div>
    </div>
  );
}
