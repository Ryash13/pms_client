import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import axios from "@/api/axiosConfig";
import { QuickLinks } from "@/types";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

interface QuickLinkDialogProps {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  displayText?: string;
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
}

const QuickLinkDialog = ({
  isEdit,
  isOpen,
  onClose,
  url,
  setUrl,
  displayText,
  setDisplayText,
}: QuickLinkDialogProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    const api = import.meta.env.VITE_ADD_QUICKLINK_URL;
    setLoading(true);
    try {
      const body = {
        url: url,
        displayText: displayText! || "",
      };
      const response = await axios.post<QuickLinks>(api, body);
      const data = response.data;
      console.log(data);
      toast.success("Link Created", {
        description: "The Link has been created Successfully.",
      });
      onClose();
    } catch (err) {
      console.log("Error occured while saving new quicklink, ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl lg:min-w-[670px]">
        <DialogHeader>
          <DialogTitle>
            {!isEdit ? "Add Quicklink" : "Update Quicklink"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="url" className="mb-1 dark:text-muted-foreground">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2"
              placeholder="Type or paste a URL"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <Label
              htmlFor="displayText"
              className="mb-1 dark:text-muted-foreground"
            >
              Display Title <br />
              <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="displayText"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
              className="w-full p-2"
              placeholder="What you'd like to see this link as"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="dark:text-muted-foreground"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
            disabled={loading}
            className="disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex gap-2">
                Adding quicklink{" "}
                <LoaderCircle className="size-5 animate-spin" />
              </div>
            ) : (
              "Add quicklink"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLinkDialog;
