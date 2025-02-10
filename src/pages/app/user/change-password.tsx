import { Input } from "@/components/ui/input";
import { useAppState } from "@/context/AppState";
import { useAuthDispatch, useAuthState } from "@/context/AuthState";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { ApiResponse, ChangePasswordRequest } from "@/types";

import axios from "@/api/axiosConfig";
import { removeItem } from "@/service/auth.service";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

const ChangePassword = () => {
  const { isDarkMode } = useAppState();
  const setLoggedInUser = useAuthDispatch();
  const loggedInUser = useAuthState();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [changePassword, setChangePassword] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangeInConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (changePassword.newPassword !== e.target.value) {
      setIsError(true);
      return;
    }
    setIsError(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    const url = import.meta.env.VITE_CHANGE_PASSWORD_URL;
    try {
      const response = await axios.post<ApiResponse<any>>(url, changePassword);
      const data = response.data?.data;
      if (!data) {
        toast.error("Failed", {
          description: "Failed to change Password, Retry again",
          action: {
            label: "OK",
            onClick: () => toast.dismiss(),
          },
        });
        return;
      }

      toast.success("Success", {
        description: "Password changed Successfully, Redirecting to login page",
        action: {
          label: "OK",
          onClick: () => toast.dismiss(),
        },
      });
      setTimeout(() => {
        setLoggedInUser(null);
        removeItem("current_project");
      }, 2000);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${isDarkMode ? "bg-dark" : "bg-light"}`}>
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-dark-bg dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <Input
                type="email"
                name="email"
                disabled
                id="email"
                className="disabled:bg-gray-700/55 disabled:cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={loggedInUser?.email}
              />
            </div>
            <div>
              <div className="w-full flex items-center justify-between rounded-lg shadow-sm dark:bg-gray-700">
                <Input
                  type="password"
                  name="old-password"
                  id="old-password"
                  value={changePassword.oldPassword}
                  onChange={(e) =>
                    setChangePassword({
                      ...changePassword,
                      oldPassword: e.target.value,
                    })
                  }
                  placeholder="Current Password"
                  className="w-full bg-transparent border-none text-gray-900 text-sm rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-gray-900 focus:border-gray-500"
                  required
                />
              </div>
            </div>
            <div>
              <div className="w-full flex items-center justify-between rounded-lg shadow-sm dark:bg-gray-700">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={changePassword.newPassword}
                  onChange={(e) =>
                    setChangePassword({
                      ...changePassword,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="New Password"
                  className="w-full bg-transparent border-none text-gray-900 text-sm rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-gray-900 focus:border-gray-500"
                  required
                />
                {showPassword ? (
                  <Eye
                    onClick={toggleShowPassword}
                    className="mr-4 cursor-pointer dark:text-foreground size-6"
                  />
                ) : (
                  <EyeOff
                    onClick={toggleShowPassword}
                    className="mr-4 cursor-pointer dark:text-foreground size-6"
                  />
                )}
              </div>
            </div>
            <div>
              <div className="w-full flex items-center justify-between rounded-lg shadow-sm dark:bg-gray-700">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleChangeInConfirmPassword}
                  placeholder="Confirm New Password"
                  className="w-full bg-transparent border-none text-gray-900 text-sm rounded-lg block p-2.5 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-gray-900 focus:border-gray-500"
                  required
                />
                {showConfirmPassword ? (
                  <Eye
                    onClick={toggleShowConfirmPassword}
                    className="mr-4 cursor-pointer dark:text-foreground size-6"
                  />
                ) : (
                  <EyeOff
                    onClick={toggleShowConfirmPassword}
                    className="mr-4 cursor-pointer dark:text-foreground size-6"
                  />
                )}
              </div>
              {isError ? (
                <p className="text-sm font-semibold text-red-600 my-2 px-1">
                  Passwords don't match.
                </p>
              ) : (
                ""
              )}
            </div>
            <Button
              disabled={
                loading ||
                isError ||
                changePassword.newPassword == "" ||
                confirmPassword == ""
              }
              type="submit"
              onClick={handleResetPassword}
              className="disabled:dark:bg-gray-400/40 disabled:dark:text-white disabled:cursor-not-allowed w-full text-white dark:text-gray-800 bg-black dark:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-gray-200 dark:focus:ring-primary-800 flex gap-2 items-center justify-center"
            >
              {loading ? (
                <>
                  Submitting
                  <LoaderCircle className="size-4 animate-spin" />{" "}
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
