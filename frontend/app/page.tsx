"use client";
import { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "../common/components/AuthGuard";
import { MainBox } from "../common/layout/MainBox";
import { IndexMessage } from "../common/message/Index.message";
import { DashBoardCountItem } from "./index/components/DashBoardCountItem";
import useProjectCountQuery from "./projects/hook/useProjectCountQuery";
import { useAuthStore } from "../store/useAuthStore";
import { StateStatus } from "../types/common/StateStatus.type";
import { API_MESSAGE_KR } from "../common/message/API.message";

export default function Home() {
  const { fetch } = useProjectCountQuery();

  const [totalProjects, setTotalProject] = useState(0);

  const loginStatus = useAuthStore((state) => state.status);

  const getProjectCount = useCallback(async () => {
    try {
      const res = await fetch();
      setTotalProject(res.data?.projects.total ?? 0);
    } catch (e) {
      alert(API_MESSAGE_KR.response.receiveError("프로젝트 개수"));
    }
  }, [fetch]);

  useEffect(() => {
    if (loginStatus === StateStatus.SUCCESS) {
      getProjectCount();
    }
  }, [getProjectCount, loginStatus]);

  return (
    <AuthGuard>
      <MainBox>
        <div className="max-w-[1024px] mx-auto">
          <h1 className="text-2xl font-bold pb-4">{IndexMessage.title}</h1>
          <div className="flex flex-wrap gap-4">
            <DashBoardCountItem
              title="Projects"
              count={totalProjects}
              lastUpdate={new Date("2024-05-04 13:00")}
            />

            <DashBoardCountItem
              title="TIL"
              count={10}
              lastUpdate={new Date("2024-05-04 13:00")}
            />
            <DashBoardCountItem
              title="Repository"
              count={11}
              lastUpdate={new Date("2024-05-04 13:00")}
            />
            <DashBoardCountItem
              title="Algorithm"
              count={24}
              lastUpdate={new Date("2024-05-04 13:00")}
            />
          </div>
        </div>
      </MainBox>
    </AuthGuard>
  );
}
