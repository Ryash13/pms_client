import { Link, Navigate } from "react-router-dom";
import Separator from "../../../components/custom/Separator";
import { LoginResponse, LoginUser } from "./login.interface";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppState";
import { LoaderIcon } from "lucide-react";
import { useAuthDispatch, User } from "@/context/AuthState";
import axios from "../../../api/axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "@/api/api";

const Login = () => {
  const [loginUser, setLoginuser] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { isDarkMode } = useAppState();
  const setLoggedInUser = useAuthDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginuser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(loginUser.email == '' || loginUser.email == null) {
      toast({
        title: 'Error',
        description: 'Enter your registered Email ID',
        variant: 'destructive'
      })
      return;
    }
    if(loginUser.password == '' || loginUser.password == null) {
      toast({
        title: 'Error',
        description: 'Enter your Password',
        variant: 'destructive'
      })
      return;
    }
    setLoading(true);
    const url = "/api/v1/auth/login";
    await axios
      .post(url, loginUser)
      .then((response: AxiosResponse<ApiResponse<LoginResponse>>) => {
        console.log(response);
        const data = response.data?.data;
        const user = data.user;
        const token = data.token;
        if (typeof user === "object") {
          setLoggedInUser(user as User);
          localStorage.setItem('auth_user', JSON.stringify(user));
        } 
        if (typeof token === "string") {
          localStorage.setItem("auth_token", token);
        }
        setLoading(false);
        <Navigate to={'/app/'} />
      })
      .catch((err) => {
        console.log(err);
        const axiosError = err as AxiosError;
        const error =
          (axiosError.response?.data as { error: string })?.error ||
          "An unknown error occurred";
        toast({
          variant: "destructive",
          title: "Error.",
          description: error,
          draggable: true,
        });
      })
      .finally(() => {
        setLoading(false)
      });
  };

  const handleOAuthClicks = () => {
    toast({
      title: "Feature not available",
      description: "Development In Progress, wait for another release.",
      draggable: true,
    });
  };

  return (
    <div
      className={`min-h-screen min-w-full flex flex-col items-center justify-center gap-4 ${
        isDarkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="text-center">
        <h4 className="text-2xl font-bold tracking-wider  text-gray-800 dark:text-gray-200">
          Sign In
        </h4>
      </div>
      <div className="w-1/3 flex flex-col gap-2">
        <input
          type="text"
          id="email"
          name="email"
          value={loginUser.email}
          onChange={handleChange}
          placeholder="name@example.com"
          className="w-full px-3 py-4 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={loginUser.password}
          onChange={handleChange}
          placeholder="************"
          className="w-full px-3 py-4 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="mt-2 bg-dark-bg dark:bg-white dark:text-black text-gray-300 w-full py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-3"
        >
          Sing In
          {loading && <LoaderIcon className="animate-spin" />}
        </button>
      </div>
      <div className="w-1/3">
        <Separator />
      </div>
      <div className="w-1/3">
        <button
          disabled={loading}
          onClick={handleOAuthClicks}
          className="z-10 shadow-sm border-[0.1em] border-gray-300 rounded-lg py-3 px-8 flex flex-row gap-3 items-center justify-center mb-4 w-full"
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
          onClick={handleOAuthClicks}
          className="z-10 shadow-sm border-[0.1em] border-gray-300 rounded-lg py-3 px-8 flex flex-row gap-3 items-center justify-center mb-5 w-full"
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
};

export default Login;
