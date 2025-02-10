import { LoginForm } from "./components/login-form";
import { toast } from "sonner";

const Login = () => {
  const handleOAuthClicks = () => {
    toast.info("OAuth is not implemented yet", {
      action: {
        label: "Close",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  return <LoginForm oAuthClick={handleOAuthClicks} />;
};

export default Login;
