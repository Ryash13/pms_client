import { Card } from "@/components/ui/card";

interface OverviewCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count: number;
}

const OverviewCard = ({ title, icon: Icon, count }: OverviewCardProps) => {
  return (
    <Card className="flex flex-row items-center py-5 px-4 gap-4 rounded-md w-full cursor-pointer hover:shadow-lg dark:hover:shadow-gray-400/40">
      <div className="flex items-center justify-center bg-gray-400/55 rounded-md p-2 w-10 h-10">
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-custom-regular text-muted-foreground">
          {title}
        </h4>
        <p className="font-custom-bold text-[20px]">{count}</p>
      </div>
    </Card>
  );
};

export default OverviewCard;
