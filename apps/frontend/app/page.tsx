"use client";
import { AuthGuard } from "../common/components/AuthGuard";
import { MainBox } from "../common/layout/MainBox";
import { IndexMessage } from "../common/message/Index.message";
import { DashBoardCountItem } from "./index/components/DashBoardCountItem";

export default function Home() {
  return (
    <AuthGuard>
      <MainBox>
        <div className="max-w-[1024px] mx-auto">
          <h1 className="text-2xl font-bold pb-4">{IndexMessage.title}</h1>
          <div className="flex flex-wrap gap-4">
            <DashBoardCountItem
              title="Projects"
              count={8}
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
