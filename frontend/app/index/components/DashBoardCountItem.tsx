import { Card, CardBody, CardHeader } from "@nextui-org/react";

type Props = {
  title: string;
  count: number;
  lastUpdate: Date;
};

export function DashBoardCountItem({ title, count, lastUpdate }: Props) {
  return (
    <Card className="w-52 h-36">
      <CardHeader>
        <h3 className="font-bold text-lg">{title}</h3>
      </CardHeader>
      <CardBody className="text-sm">
        <p>Counts: {count}</p>
        <p className="mt-2 text-xs text-gray-400">
          Last Update: {lastUpdate.toLocaleString()}
        </p>
      </CardBody>
    </Card>
  );
}
