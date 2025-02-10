import { useState } from "react";
import { useAuthState } from "@/context/AuthState";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccountDeleteDialog from "./user-account-delete-dialog";

const ProfileSettings = () => {
  const loggedInUser = useAuthState();
  const [updateUser, setUpdateUser] = useState<User>(loggedInUser!);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const UserRoles = [
    "Individual Contributor",
    "Human Resource",
    "Student / Professor",
    "Sales / Marketing",
    "Founder / Executive",
  ];

  const openDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleRoleChange = (value: string) => {
    setUpdateUser({ ...updateUser, role: value });
  };

  return (
    <div className="flex w-full flex-col gap-6 px-24 pt-10">
      <AccountDeleteDialog isOpen={isDeleteDialogOpen} onClose={closeDialog} />
      <div className="relative h-44 w-full">
        <img
          src={updateUser?.coverImageUrl}
          className="h-44 w-full rounded-lg object-cover"
          alt="Yash"
        />
        <div className="absolute -bottom-6 left-6 flex items-end justify-between">
          <div className="flex gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg">
              <button type="button">
                <Avatar className="h-16 w-16 rounded-full bg-white/55">
                  <AvatarImage
                    src={loggedInUser?.profileImageUrl}
                    alt={loggedInUser?.firstName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {loggedInUser?.firstName.charAt(0)}
                    {loggedInUser?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex">
          <div className="relative z-20">
            <button
              className="rounded border border-gray-400/50 px-2 py-1 text-xs text-white bg-white/20 dark:text-foreground hover:bg-white/55"
              type="button"
            >
              Change cover
            </button>
          </div>
        </div>
      </div>
      <div className="item-center mt-6 flex justify-between">
        <div className="flex flex-col">
          <div className="item-center flex text-lg font-medium dark:text-gray-400">
            <span>
              {updateUser?.firstName} {updateUser?.lastName}
            </span>
          </div>
          <span className="text-sm dark:text-gray-400/50 tracking-tight">
            {updateUser?.email}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="item-center flex text-lg font-medium dark:text-gray-400">
            <span className="text-sm dark:text-gray-400/50 tracking-tight">
              Created At: {format(updateUser?.createdAt, "MMMM dd, yyyy")}
            </span>
          </div>
          <span className="text-sm dark:text-gray-400/50 tracking-tight">
            <span className="text-sm dark:text-gray-400/50 tracking-tight">
              Last Modified At:{" "}
              {updateUser?.lastModifiedAt
                ? format(updateUser?.lastModifiedAt, "MMMM dd, yyyy")
                : "NA"}
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium dark:text-muted-foreground">
              First name&nbsp;<span className="text-red-500">*</span>
            </h4>
            <input
              id="first_name"
              className="block bg-transparent text-sm dark:text-gray-300 placeholder-custom-text-400 focus:outline-none border-[0.5px] border-custom-border-200 px-3 py-2 w-full rounded-md"
              placeholder="Enter your first name"
              type="text"
              value={updateUser?.firstName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, firstName: e.target.value })
              }
              name="first_name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium dark:text-muted-foreground">
              Last name
            </h4>
            <input
              id="last_name"
              className="block bg-transparent text-sm dark:text-gray-300 placeholder-muted-foreground focus:outline-none border-[0.5px] px-3 py-2 w-full rounded-md"
              placeholder="Enter your last name"
              type="text"
              value={updateUser?.lastName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, lastName: e.target.value })
              }
              name="last_name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium dark:text-muted-foreground">
              Username&nbsp;<span className="text-red-500">*</span>
            </h4>
            <input
              id="display_name"
              className="block bg-transparent text-sm dark:text-gray-300 placeholder-muted-foreground focus:outline-none rounded-md border-[0.5px] px-3 py-2 w-full"
              placeholder="Enter your display name"
              type="text"
              value={updateUser?.username}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, username: e.target.value })
              }
              name="display_name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium dark:text-muted-foreground">
              Email&nbsp;<span className="text-red-500">*</span>
            </h4>
            <input
              id="email"
              className="block dark:bg-transparent/90 text-sm dark:text-gray-300 placeholder-muted-foreground focus:outline-none border-[0.5px] px-3 py-2 w-full cursor-not-allowed rounded-md"
              placeholder="Enter your email"
              disabled
              type="email"
              value={updateUser?.email}
              readOnly
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium dark:text-muted-foreground">
              Role&nbsp;<span className="text-red-500">*</span>
            </h4>
            <div className="relative flex-shrink-0 text-left rounded-md border-[0.5px] !border-custom-border-200">
              <Select
                defaultValue={updateUser?.role}
                value={updateUser?.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className="w-full border-[0.5px] dark:text-gray-300">
                  <SelectValue placeholder="Select a role appropiate for your profile" />
                </SelectTrigger>
                <SelectContent>
                  {UserRoles.map((role, index) => (
                    <div key={index}>
                      <SelectItem value={role}>{role}</SelectItem>
                      <SelectSeparator />
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium dark:text-muted-foreground">
          Bio&nbsp;<span className="text-red-500">*</span>
        </h4>
        <div className="grid grid-cols-1 w-full">
          <textarea
            // className="dark:text-gray-300 rounded-md dark:bg-transparent border-[0.5px] px-4 py-2"
            className="block bg-transparent text-sm dark:text-gray-300 placeholder-muted-foreground focus:outline-none rounded-md border-[0.5px] px-3 py-2 w-full"
            rows={4}
            value={updateUser?.bio}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, bio: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <Button
            variant="default"
            type="submit"
            className="text-white dark:text-muted bg-black dark:bg-white hover:bg-black/40 dark:hover:bg-white/90 px-4 py-1.5 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center"
          >
            Save changes
          </Button>
        </div>
      </div>
      <Separator />
      {/* Terminate account */}
      <div className="dark:text-muted-foreground pb-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl tracking-wide font-semibold">
              Terminate Account
            </AccordionTrigger>
            <AccordionContent className="text-[14px] w-3/4 ">
              <div className="mb-8 pt-2">
                When terminating an account, all of the data and resources
                within that account will be permanently removed and cannot be
                recovered.
              </div>
              <Button variant="destructive" onClick={openDialog}>
                Terminate Account
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProfileSettings;
