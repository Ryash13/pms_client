import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface AccountAlreadyRegisteredProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountAlreadyRegistered = ({
  isOpen,
  onClose,
}: AccountAlreadyRegisteredProps) => {
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
            Account Already Exists!
          </DialogTitle>
          <Separator className="mb-3" />
          <DialogDescription className="text-gray-800 dark:text-foreground">
            An account with this email address is already registered. Please use
            a different one.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountAlreadyRegistered;
