import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of the user
export interface User {
  name: string;
  email: string;
  publicId: string;
  profileImageUrl: string;
}

// Define the context
const AuthStateContext = createContext<User | null>(null);
const AuthDispatchContext = createContext<
  Dispatch<SetStateAction<User | null>> | undefined
>(undefined);

// Provider component
interface AuthStateProviderProps {
  children: ReactNode;
}

export const AuthStateProvider: React.FC<AuthStateProviderProps> = ({
  children,
}) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <AuthStateContext.Provider value={loggedInUser}>
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
