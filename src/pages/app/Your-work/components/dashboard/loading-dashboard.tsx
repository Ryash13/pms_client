import { Skeleton } from "@/components/ui/skeleton";

const LoadingDashboard = () => {
  return (
    <div className="min-w-fit flex flex-col gap-12 py-6">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[1, 2, 3].map((i) => {
            return <Skeleton key={i} className="rounded-md w-full h-24" />;
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          {[1, 2, 3, 4, 5].map((i) => {
            return <Skeleton key={i} className="rounded-md w-full h-24" />;
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="p-4 flex gap-4 flex-col">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="rounded-md w-full h-56" />
        </div>

        <div className="p-4 flex gap-4 flex-col">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="rounded-md w-full h-56" />
        </div>
      </div>
    </div>
  );
};

export default LoadingDashboard;
