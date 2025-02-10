import { HeaderType } from "./page";

interface WorkHeaderProps {
  headers: readonly HeaderType[];
  selectedHeader: string;
  setSelectedHeader: React.Dispatch<React.SetStateAction<HeaderType>>;
}

const WorkHeader = ({
  headers,
  selectedHeader,
  setSelectedHeader,
}: WorkHeaderProps) => {
  return (
    <div className="w-full flex items-center gap-10 px-10 border-b border-b-gray-400/20">
      {headers.map((header, index) => (
        <div
          key={index}
          className={`${
            selectedHeader == header
              ? "border-b-2 border-b-gray-500/55 dark:border-b-[#1D4ED8]"
              : ""
          } py-4 px-1`}
        >
          <button
            onClick={() => setSelectedHeader(header)}
            className={`text-[12.6px] font-[500] font-custom-regular  ${
              selectedHeader == header
                ? "text-gray-500/55 dark:text-[#1D4ED8] font-custom-medium"
                : "dark:text-white"
            }`}
          >
            {header}
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkHeader;
