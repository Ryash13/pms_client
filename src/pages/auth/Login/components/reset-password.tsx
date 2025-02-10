import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "@/api/axiosConfig";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword = ({ isOpen, onClose }: ResetPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Please enter your email to reset password.", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }
    setLoading(true);
    const url = import.meta.env.VITE_RESET_PASSWORD_URL;
    try {
      const response = await axios.get(`${url}?email=${email}`);
      const data = await response.data?.data;
      console.log(data);
      toast.success(data);
    } catch (err) {
      console.log("Error occured while resetting password :: ", err);
      toast.error("Failed to reset password. Please try again later.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="mb-2 text-gray-800 dark:text-foreground">
            Reset Password
          </DialogTitle>
          <DialogDescription>
            Forgot your credentials? No worries! Enter your registered email and
            reset you password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="john.doe@example.com"
              className="col-span-4 dark:text-foreground"
            /> */}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              className="col-span-4 px-3 py-2 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            type="button"
            onClick={onClose}
            variant={"outline"}
            className="text-foreground"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            type="button"
            onClick={handleResetPassword}
          >
            {loading ? (
              <>
                <LoaderCircle className="size-4 mr-2 animate-spin" /> Submitting
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
