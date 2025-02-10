import { useAuthState } from "@/context/AuthState";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Greetings = () => {
  const [time, setTime] = useState(new Date());
  const loggedInUser = useAuthState();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) return "Good Morning ☀️";
    if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
    if (hour >= 17 && hour < 23) return "Good Evening 🌙";
    return "Good Night 🌙";
  };
  return (
    <div className="flex flex-col gap-2 font-custom-regular tracking-tighter">
      <div className="text-[18px] text-foreground font-[550]">
        {getGreeting()}, {loggedInUser?.firstName} {loggedInUser?.lastName}
      </div>
      <div className="text-muted-foreground font-[500] text-[15px]">
        {format(time, "EEEE, MMM d - yyyy h:mm a")}
      </div>
    </div>
  );
};

export default Greetings;
