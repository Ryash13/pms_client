import { User } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";

const AuthStateContext = createContext<User | null>(null);
const AuthDispatchContext = createContext<
  Dispatch<SetStateAction<User | null>> | undefined
>(undefined);

interface AuthStateProviderProps {
  children: ReactNode;
}

export const AuthStateProvider: React.FC<AuthStateProviderProps> = ({
  children,
}) => {
  const storedUser = localStorage.getItem("auth_user");
  const initialState = storedUser ? JSON.parse(storedUser) : null;
  const [loggedInUser, setLoggedInUser] = useState<User | null>(initialState);

  useEffect(() => {
    // Sync the loggedInUser with localStorage whenever it changes
    if (loggedInUser) {
      console.log("user found");
      localStorage.setItem("auth_user", JSON.stringify(loggedInUser));
    } else {
      console.log("user removed");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("current_project");
      localStorage.removeItem("$user_id");
    }
  }, [loggedInUser]);

  const value = useMemo(() => loggedInUser, [loggedInUser]);

  return (
    <AuthStateContext.Provider value={value}>
      <AuthDispatchContext.Provider value={setLoggedInUser}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Custom hooks
export const useAuthState = (): User | null => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within AuthStateProvider");
  }
  return context;
};

export const useAuthDispatch = (): Dispatch<SetStateAction<User | null>> => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within AuthStateProvider");
  }
  return context;
};
