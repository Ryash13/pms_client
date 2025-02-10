import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  KeyRound,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthDispatch, useAuthState } from "@/context/AuthState";
import { useNavigate } from "react-router-dom";

export function NavUser() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const loggedInUser = useAuthState();
  const setLoggedInUser = useAuthDispatch();

  const handleLogout = () => {
    console.log("Logging out");
    setLoggedInUser(null);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={loggedInUser?.profileImageUrl}
                  alt={loggedInUser?.firstName}
                />
                <AvatarFallback className="rounded-lg">
                  {loggedInUser?.firstName.charAt(0)}
                  {loggedInUser?.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {loggedInUser?.firstName} {loggedInUser?.lastName}
                </span>
                <span className="truncate text-xs">{loggedInUser?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={loggedInUser?.profileImageUrl}
                    alt={loggedInUser?.firstName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {loggedInUser?.firstName.charAt(0)}
                    {loggedInUser?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {loggedInUser?.firstName} {loggedInUser?.lastName}
                  </span>
                  <span className="truncate text-xs">
                    {loggedInUser?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/app/user")}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/app/user/change-password")}
              >
                <KeyRound />
                Security
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
