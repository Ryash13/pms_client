import { useAuthDispatch, useAuthState } from "@/context/AuthState";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ApiResponse } from "@/types";
import { toast } from "sonner";

import axios from "@/api/axiosConfig";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface AccountDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountDeleteDialog = ({ isOpen, onClose }: AccountDeleteDialogProps) => {
  const loggedInUser = useAuthState();
  const setLoggedInUser = useAuthDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleAccountDelete = async () => {
    const url =
      import.meta.env.VITE_ACCOUNT_DELETE_URL +
      "?publicId" +
      loggedInUser?.publicId;
    try {
      const response = await axios.delete<ApiResponse<any>>(url);
      const data = response.data?.data;
      if (!data) {
        toast.error("Failed", {
          description:
            "Failed to terminate your account, Please retry again later",
          action: {
            label: "OK",
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }
      toast.success("Success", {
        description: "Account Deleted Successfully.",
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });
      setLoggedInUser(null);
      navigate("/register");
    } catch (err) {
      console.log("Error occurred while changing password: ", err);
      const error = err as AxiosError;
      const errMsg = (error.response?.data as { error: string })?.error;
      toast.error("Error", {
        description: errMsg,
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-foreground flex gap-4">
            <Trash2 className="size-6 text-red-500" />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-3">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  To confirm, type{" "}
                  <span className="font-semibold text-foreground">
                    "{loggedInUser?.email}"
                  </span>{" "}
                  in the box below{" "}
                </p>
                <Input
                  type="text"
                  className="rounded-md text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="dark:text-foreground"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={email != loggedInUser?.email}
            className="disabled:cursor-not-allowed"
            onClick={handleAccountDelete}
          >
            Delete Account
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountDeleteDialog;
