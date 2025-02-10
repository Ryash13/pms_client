import { Card } from "@/components/ui/card";

interface WorkloadCardProps {
  title: string;
  color: string;
  count: number;
}

const WorkloadCard = ({ title, color, count }: WorkloadCardProps) => {
  return (
    <Card className="flex flex-row items-center py-4 px-4 gap-4 rounded-md w-full cursor-pointer hover:shadow-lg dark:hover:shadow-gray-400/55">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row gap-3 items-center">
          <div
            className={`h-3 w-3 rounded-sm`}
            style={{ backgroundColor: color }}
          />
          <h4>{title}</h4>
        </div>
        <h4 className="font-custom-bold text-[20px]">{count}</h4>
      </div>
    </Card>
  );
};

export default WorkloadCard;
