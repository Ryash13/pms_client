import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Wrapper from "./wrapper";
import Login from "./pages/auth/login";
import Settings from "./pages/app/settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/app" />} />
        <Route path="/app" element={<Wrapper />}>
          <Route path="/app/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
