import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavMainItemProps {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export interface NavMainProps {
  items: NavMainItemProps[];
}

export function NavMain({ items }: NavMainProps) {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const checkIfAciveRoute = (item: NavMainItemProps) => {
    return pathName === item.url;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuItem
            key={index}
            onClick={() => handleNavigation(item.url)}
          >
            <SidebarMenuButton
              tooltip={item.title}
              className={`flex flex-row gap-2 rounded-md hover:bg-gray-500/55 px-3 cursor-pointer py-[0.35rem] items-center ${
                checkIfAciveRoute(item) ? "bg-gray-500/55" : ""
              }`}
            >
              {item.icon && <item.icon className="size-5" />}
              <span className="transition-all duration-200 group-data-[state=collapsed]:hidden">
                {item.title}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
