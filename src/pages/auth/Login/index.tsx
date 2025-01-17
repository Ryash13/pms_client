import { Link } from "react-router-dom";
import Separator from "../../../components/custom/Separator";
import { LoginResponse, LoginUser } from "./login.interface";
import { useEffect, useState } from "react";
import useApi from "@/api/api";
import Loader from "@/components/custom/Loader";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [loginUser, setLoginuser] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const loginUrl = "api/v1/auth/login";

  const { response, loading, error, triggerApi } = useApi<LoginResponse>(
    loginUrl,
    "POST",
    loginUser
  );

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
        draggable: true,
      });
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex min-h-screen min-w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginuser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerApi();
    console.log(response);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="flex w-full min-h-[98vh] max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="./public/app1.png"
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-end justify-end w-full">
            <h1 className="font-medium text-xl text-gray-900 dark:text-white">
              Welcome back!
            </h1>
            <h2 className="text-[10px] mt-1 text-center text-gray-900 dark:text-white">
              Streamline Your Projects: Log In to Collaborate and Conquer!
            </h2>
          </div>
          <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={loginUser.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={loginUser.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-5 w-5 accent-gray-900 dark:accent-gray-300"
                />
                <label htmlFor="remember" className="dark:text-gray-200">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-[12px] cursor-pointer text-gray-900 dark:text-white"
              >
                Reset Password
              </a>
            </div>
            <button className="outline-none w-full px-4 py-2 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-400">
              Sign In
            </button>
          </form>
          <div className="flex flex-row items-start justify-start mt-4 mb-4 w-full">
            <p className="mb-1 text-gray-400 dark:text-white font-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-gray-900 dark:text-white"
              >
                Sign up
              </Link>
            </p>
          </div>
          <Separator />
          <div className="flex flex-col w-full">
            <button
              type="button"
              className="z-10 shadow-sm border-[0.1em] border-gray-300 rounded-lg py-3 px-8 flex flex-row gap-3 items-center justify-center mt-5 mb-5 w-full"
            >
              <img
                src="./public/google.png"
                alt="Google"
                className="object-contain w-4 h-4"
              />
              <p className="tracking-wider dark:text-gray-200">
                Continue with Google
              </p>
            </button>
            <button
              type="button"
              className="z-10 shadow-sm border-[0.1em] border-gray-300 rounded-lg py-3 px-8 flex flex-row gap-3 items-center justify-center mb-5 w-full"
            >
              <img
                src="./public/github.png"
                alt="GitHub"
                className="object-contain w-5 h-5"
              />
              <p className="tracking-wider dark:text-gray-200">
                Continue with GitHub
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
