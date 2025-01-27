import { useEffect, useState } from "react";
import Separator from "@/components/custom/Separator";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppState";
import { Link } from "react-router-dom";
import useApi from "@/api/api";
import { LoaderIcon } from "lucide-react";

const Register = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const { toast } = useToast();
  const { isDarkMode } = useAppState();
  const { data, error, loading, makeApiCall } = useApi<boolean, null>();

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

  const handleOAuthClicks = () => {
    toast({
      title: "Feature not available",
      description: "Development In Progress, wait for another release.",
      draggable: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkEmailUrl = '/api/v1/auth/isEmailRegistered';
    if(!userEmail) {
      toast({
        title: 'Error',
        description: 'Enter a valid Email Id',
        variant: 'destructive'
      })
      return;
    }
    await makeApiCall(checkEmailUrl, 'GET' , null, {'email' : userEmail});
    console.log(data);
    if(data) {
      toast({
        title: 'Error',
        description: 'Email ID is already registered, Enter a new one',
        variant: 'destructive'
      })
      return;
    }
    localStorage.setItem("register_email", userEmail);
  };

  return (
    <div
      className={`min-h-screen min-w-full flex flex-col items-center justify-center gap-4 ${
        isDarkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="text-center">
        <h4 className="text-2xl font-bold tracking-wider  text-gray-800 dark:text-gray-200">
          Sign Up
        </h4>
      </div>
      <div className="w-1/3 flex flex-col gap-2">
        <input
          type="text"
          id="email"
          name="email"
          value={userEmail}
          onChange={handleChange}
          placeholder="name@example.com"
          className="w-full px-3 py-4 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-2 bg-dark-bg dark:text-gray-300 text-gray-300 w-full py-3 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-3"
        >
          Continue
          {loading && <LoaderIcon className="animate-spin" />}
        </button>
      </div>
      <div className="w-1/3">
        <Separator />
      </div>
      <div className="w-1/3">
        <button
          type="button"
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
        <p className="text-sm dark:text-gray-300">Already have an account? <span className="cursor-pointer underline font-semibold">
            <Link to='/login' >
              Sign In
            </Link>
          </span></p>
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
