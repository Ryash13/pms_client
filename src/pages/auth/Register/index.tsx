import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { ApiResponse } from "@/types";
import { useAppState } from "@/context/AppState";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import AuthSeparator from "@/components/custom/Separator";
import AccountAlreadyRegistered from "./components/account-already-exists";
import axios from "@/api/axiosConfig";
import { setItem } from "@/service/auth.service";

const Register = () => {
  const handleOAuthClicks = () => {
    toast.info("Alert", {
      description: "OAuth is not implemented yet",
      action: {
        label: "Close",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  const [isAccountAlreadyExists, setIsAccountAlreadyExists] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isDarkMode } = useAppState();

  const navigate = useNavigate();

  const closeModel = () => {
    setIsAccountAlreadyExists(false);
  };

  const handleSignUpUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
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
    setLoading(true);
    const url = import.meta.env.VITE_IS_EMAIL_REGISTERED_URL + email;
    try {
      const response = await axios.get<ApiResponse<any>>(url);
      const data = response.data.data;
      if (!data) {
        setIsAccountAlreadyExists(true);
        setEmail("");
        return;
      }
      setItem("$user_id", email);
      console.log("Navigate to Onboarding screen");
      navigate("/onboarding");
    } catch (err) {
      console.log(
        "Error occured while validating is email is already registered :: ",
        err
      );
      const axiosError = err as AxiosError;
      if (axiosError.response?.data as string) {
        toast.error(axiosError.response?.data as string, {
          action: {
            label: "Close",
            onClick: () => {
              toast.dismiss();
            },
          },
        });
      }
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
      <AccountAlreadyRegistered
        isOpen={isAccountAlreadyExists}
        onClose={closeModel}
      />
      <div className="text-center">
        <h4 className="text-2xl font-bold tracking-wider  text-gray-800 dark:text-gray-200">
          Welcome to Align IQ
        </h4>
      </div>
      <div className="w-1/3 flex flex-col gap-2">
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@example.com"
          className="w-full px-3 py-4 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={handleSignUpUser}
          disabled={loading}
          className="mt-2 bg-dark-bg dark:text-gray-300 text-gray-300 w-full py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <LoaderCircle className="size-4 mr-2 animate-spin" /> Submitting
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      <div className="w-1/3">
        <AuthSeparator />
      </div>
      <div className="w-1/3">
        <button
          type="button"
          onClick={handleOAuthClicks}
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
          onClick={handleOAuthClicks}
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
          Already have an account?{" "}
          <span className="cursor-pointer underline font-semibold">
            <Link to="/login">Sign In</Link>
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
};

export default Register;
