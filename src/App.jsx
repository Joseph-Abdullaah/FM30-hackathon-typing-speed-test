import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router";
import { useTSTStore } from "./store/TSTStore";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Setting from "./pages/Setting";

// Component to protect Result route - only accessible when game is finished
function ResultRoute() {
  const { gameState } = useTSTStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameState !== "finished") {
      navigate("/", { replace: true });
    }
  }, [gameState, navigate]);

  if (gameState !== "finished") {
    return null;
  }

  return <Result />;
}

// Component to redirect to result when game finishes
function GameStateRedirect() {
  const { gameState } = useTSTStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameState === "finished" && location.pathname === "/") {
      navigate("/result", { replace: true });
    }
  }, [gameState, location.pathname, navigate]);

  return null;
}

function App() {
  const { theme } = useTSTStore();

  // Sync theme with document attribute on load and change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <GameStateRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<ResultRoute />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
