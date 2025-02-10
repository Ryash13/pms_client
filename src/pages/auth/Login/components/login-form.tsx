import { useState } from "react";
import ResetPassword from "./reset-password";
import axios from "@/api/axiosConfig";
import { AxiosError } from "axios";
import { useAuthDispatch } from "@/context/AuthState";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { setItem } from "@/service/auth.service";
import { useAppState } from "@/context/AppState";
import { ApiResponse, LoginResponse, LoginUser, User } from "@/types";
import AuthSeparator from "@/components/custom/Separator";

interface LoginFormProps {
  oAuthClick: () => void;
}

export function LoginForm({ oAuthClick }: LoginFormProps) {
  const [isForgetPasswordModelOpen, setIsForgetPasswordModelOpen] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loginUser, setLoginuser] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { isDarkMode } = useAppState();
  const setLoggedInUser = useAuthDispatch();

  const openModel = () => {
    setIsForgetPasswordModelOpen(true);
  };

  const closeModel = () => {
    setIsForgetPasswordModelOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser.email == "" || loginUser.email == null) {
      toast.warning("Enter a valid Email ID", {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      return;
    }
    if (loginUser.password == "" || loginUser.password == null) {
      toast.warning("Enter your password", {
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
    const url = import.meta.env.VITE_LOGIN_URL;
    try {
      const response = await axios.post<ApiResponse<LoginResponse>>(
        url,
        loginUser
      );
      const data = response.data?.data;
      const user = data.user as User;
      const token = data.token as string;

      setLoggedInUser(user);
      setItem("auth_user", JSON.stringify(user));
      setItem("auth_token", token);
      <Navigate to={"/app/"} />;
    } catch (err) {
      console.log(err);
      const axiosError = err as AxiosError;
      const error =
        (axiosError.response?.data as { error: string })?.error ||
        "An unknown error occurred";
      toast.error(error, {
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen min-w-full flex flex-col items-center justify-center gap-4 ${
        isDarkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <ResetPassword isOpen={isForgetPasswordModelOpen} onClose={closeModel} />
      <div className="text-center flex flex-col gap-1">
        <h4 className="text-2xl font-bold tracking-wider  text-gray-800 dark:text-gray-200">
          Welcome Back
        </h4>
        <p className="text-sm dark:text-gray-300">
          Enter your email below to login to your account or use Google or
          GitHub Login
        </p>
      </div>
      <div className="w-1/3 flex flex-col gap-2">
        <input
          type="text"
          id="email"
          name="email"
          value={loginUser.email}
          onChange={(e) =>
            setLoginuser({ ...loginUser, email: e.target.value })
          }
          placeholder="name@example.com"
          className="w-full px-3 py-4 mt-1 border-none rounded-lg shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
        />
        <div className="w-full flex items-center justify-between rounded-lg shadow-sm dark:bg-gray-700">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={loginUser.password}
            onChange={(e) =>
              setLoginuser({ ...loginUser, password: e.target.value })
            }
            placeholder="************"
            className="w-full bg-transparent border-none px-3 py-4 mt-1 focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:text-white"
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
        <div className="flex justify-end items-end">
          <a
            onClick={openModel}
            className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer dark:text-foreground"
          >
            Forgot your password?
          </a>
        </div>
        <button
          disabled={loading}
          onClick={handleLoginUser}
          className="mt-2 bg-dark-bg dark:text-gray-300 text-gray-300 w-full py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <LoaderCircle className="size-4 mr-2 animate-spin" /> Submitting
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
      <div className="w-1/3">
        <AuthSeparator />
      </div>
      <div className="w-1/3">
        <button
          disabled={loading}
          onClick={oAuthClick}
          className="z-10 shadow-sm border-[0.1em] dark:hover:bg-gray-800 border-gray-300 rounded-lg py-3 px-8 flex flex-row gap-3 items-center justify-center mb-4 w-full"
        >
          <img
            src="/google.png"
            alt="Google"
            className="object-contain w-4 h-4"
          />
          <p className="tracking-wider dark:text-gray-200">
            Continue with Google
          </p>
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={oAuthClick}
          className="z-10 shadow-sm border-[0.1em] dark:hover:bg-gray-800 border-gray-300 rounded-lg py-3 px-8 flex flex-row gap-3 items-center justify-center mb-5 w-full"
        >
          <img
            src="/github.png"
            alt="GitHub"
            className="object-contain w-5 h-5"
          />
          <p className="tracking-wider dark:text-gray-200">
            Continue with GitHub
          </p>
        </button>
      </div>
      <div className="w-full text-center -mb-2">
        <p className="text-sm dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <span className="cursor-pointer underline font-semibold">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
      <div className="w-1/6 text-center mt-4">
        <p className="text-gray-800 dark:text-gray-300 font-normal text-sm tracking-wide">
          By creating an account, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy.</span>
        </p>
      </div>
    </div>
  );
}
