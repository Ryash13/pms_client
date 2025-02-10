import { useAppState } from "@/context/AppState";
import axios from "@/api/axiosConfig";
import { useState } from "react";
import { RegisterUser } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { getItem } from "@/service/auth.service";

const RegisterForm = () => {
  const mail = getItem("$user_id");
  const { isDarkMode } = useAppState();
  const [newUser, setNewUser] = useState<RegisterUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="grid grid-cols-12 min-h-screen dark:text-foreground dark:bg-black">
      {/* Right Section - Hidden on Small Screens, Fixed Position */}
      <div
        className={`hidden lg:flex col-span-4 flex-col justify-center items-start p-8 h-screen fixed right-0 top-0 w-1/3 ${
          isDarkMode ? "bg-dark" : "bg-light"
        }`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
          <span className="text-gray-300">{mail}</span>
        </div>
        <div className="text-lg font-semibold mb-2">PL-17</div>
        <p className="text-gray-400">Create revenue and expense forecasts</p>
        <div className="mt-4 text-gray-400 text-sm">
          Developing is made by{" "}
          <span className="text-blue-400">@charlietaylor</span> and expense
          forecasts are based on historical data.
        </div>
      </div>

      {/* Left Section - Scrollable, Takes Full Width on Small Screens */}
      <div className="lg:col-span-8 col-span-12 overflow-y-auto flex flex-col items-center justify-center p-6 min-h-screen w-full">
        {/* Email visible on top in small screens */}
        <div className="lg:hidden flex items-center justify-center mb-4 text-gray-300 text-sm w-full">
          {mail}
        </div>

        <div className="max-w-md w-full dark:text-foreground dark:bg-black p-8 rounded-2xl shadow-lg">
          <div className="text-sm font-semibold mb-4 text-gray-400">
            1 of 4 steps
          </div>
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-6">
            <div className="h-full w-1/4 bg-green-500"></div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">
            Welcome to Align IQ!
          </h1>
          <p className="text-center text-gray-400 mb-6">
            Let&apos;s set up your profile, tell us a bit about yourself.
          </p>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-600 rounded-full text-xl font-bold mb-2">
              R
            </div>
            <button className="text-blue-400 text-sm hover:underline">
              Choose image
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 text-sm">First Name*</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none"
              placeholder="John"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 text-sm">Last Name*</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none"
              placeholder="Doe"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label className="block text-gray-300 text-sm">
              Set a password*
            </label>
            <div className="flex bg-gray-700 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none"
                placeholder="New password..."
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <button
                type="button"
                className="flex items-center mr-3 text-gray-400"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label className="block text-gray-300 text-sm">
              Confirm password*
            </label>
            <div className="flex bg-gray-700 rounded-lg">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none"
                placeholder="Confirm password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="flex items-center mr-3 text-gray-400"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            disabled={newUser.password == confirmPassword ? false : true}
            className="disabled:bg-blue-600/10 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 mt-6 rounded-lg font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
