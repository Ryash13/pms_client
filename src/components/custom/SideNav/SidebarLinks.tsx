import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type SideBarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  // isCollapsed: boolean;
};

const SidebarLinks = ({ href, icon: Icon, label }: SideBarLinkProps) => {
  const pathName = useLocation().pathname;
  const isActiveRoute =
    pathName === href || (pathName === "/" && href === "/dashboard");

  return (
    <Link to={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActiveRoute ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActiveRoute && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="text-[14px] font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLinks;
