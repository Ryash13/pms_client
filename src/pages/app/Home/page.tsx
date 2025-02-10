import { Link, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { QuickLinks } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

import Greetings from "./components/greetings";
import QuickLinkDialog from "./components/manage-quicklinks-dialog";
import axios from "@/api/axiosConfig";

const Homepage = () => {
  const [url, setUrl] = useState<string>("");
  const [displayText, setDisplayText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openQuickLinkDialog, setOpenQuickLinkDialog] =
    useState<boolean>(false);

  const [links, setLinks] = useState<QuickLinks[]>([]);

  useEffect(() => {
    const fetchQuickLinks = async () => {
      setLoading(true);
      const url = import.meta.env.VITE_GET_ALL_QUICKLINKS_URL;
      try {
        const response = await axios.get<QuickLinks[]>(url);
        const data = response.data;
        if (data.length > 0) {
          setLinks(data);
        }
      } catch (err) {
        console.log("Error occured while fetching quicklinks: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuickLinks();
  }, []);

  const openDialog = () => {
    setOpenQuickLinkDialog(true);
  };

  const closeDialog = () => {
    setOpenQuickLinkDialog(false);
  };

  return (
    <div className="px-8 py-6 min-h-screen min-w-fit">
      <QuickLinkDialog
        isEdit={isEdit}
        isOpen={openQuickLinkDialog}
        onClose={closeDialog}
        url={url}
        setUrl={setUrl}
        displayText={displayText}
        setDisplayText={setDisplayText}
      />
      <Greetings />
      <div className="mt-12 flex items-center justify-between">
        <h3 className="font-medium text-lg text-muted-foreground">
          Quicklinks
        </h3>
        <Button
          className="flex gap-2 items-center text-blue-600"
          variant="secondary"
          onClick={openDialog}
        >
          <Plus className="size-5" />
          <span>Add quicklinks</span>
        </Button>
      </div>

      {/* Show all quick links */}
      <section className="py-6">
        {loading ? (
          <Skeleton className="w-full h-40 rounded-lg bg-gray-600" />
        ) : (
          <div>
            {links.length === 0 ? (
              <div className="min-h-[180px] rounded-md bg-gray-400/20 flex items-center justify-center gap-3 text-muted-foreground">
                <Link className="size-5" />{" "}
                <span className="text-lg font-custom-medium">
                  Save links to work things that you'd like handy.
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <div key={index} className="w-full max-w-[15rem]">
                    <div className="flex items-center px-4 py-3 border rounded-lg shadow-sm bg-white dark:bg-[#191919]">
                      {/* Icon */}
                      <div className="p-2 bg-gray-100 dark:bg-black rounded-lg">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Link className="w-5 h-5 text-gray-500" />
                        </a>
                      </div>

                      {/* Content */}
                      <div className="ml-3">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-foreground"
                        >
                          {link.displayText}
                        </a>
                        <p className="text-xs mt-1 text-gray-500">
                          {formatDistanceToNow(new Date(link.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
