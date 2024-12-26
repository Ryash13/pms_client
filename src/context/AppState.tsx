import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

interface AppState {
  isDarkMode: boolean;
  isSideBarCollapsed: boolean;
}

type AppAction = { type: "TOGGLE_DARK_MODE" } | { type: "TOGGLE_SIDEBAR" };

const loadInitialState = (): AppState => {
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";
  const isSideBarCollapsed =
    localStorage.getItem("isSideBarCollapsed") === "true";
  return {
    isDarkMode,
    isSideBarCollapsed,
  };
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      const newDarkModeState = !state.isDarkMode;
      localStorage.setItem("isDarkMode", newDarkModeState.toString());
      return { ...state, isDarkMode: newDarkModeState };
    case "TOGGLE_SIDEBAR":
      const newSideBarCollapsedState = !state.isSideBarCollapsed;
      localStorage.setItem(
        "isSideBarCollapsed",
        newSideBarCollapsedState.toString()
      );
      return { ...state, isSideBarCollapsed: newSideBarCollapsedState };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

// Contexts
const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch<AppAction> | undefined>(
  undefined
);

// Provider component
interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, loadInitialState());

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Custom hooks
export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
};

export const useAppDispatch = (): Dispatch<AppAction> => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within AppStateProvider");
  }
  return context;
};

// Action creators
export const toggleDarkMode = (): AppAction => ({ type: "TOGGLE_DARK_MODE" });
export const toggleSidebarCollapse = (): AppAction => ({
  type: "TOGGLE_SIDEBAR",
});
