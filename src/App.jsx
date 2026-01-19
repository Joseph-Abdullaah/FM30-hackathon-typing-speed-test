import React, { useState, useEffect } from "react";
import { useTSTStore } from "./store/TSTStore";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Setting from "./pages/Setting";

function App() {
  const { gameState, theme } = useTSTStore();
  const [currentPage, setCurrentPage] = useState("home");

  // Sync theme with document attribute on load and change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for navigation events
  useEffect(() => {
    const handleNavigateToHome = () => setCurrentPage("home");
    const handleNavigateToSettings = () => setCurrentPage("settings");

    window.addEventListener("navigateToHome", handleNavigateToHome);
    window.addEventListener("navigateToSettings", handleNavigateToSettings);

    return () => {
      window.removeEventListener("navigateToHome", handleNavigateToHome);
      window.removeEventListener(
        "navigateToSettings",
        handleNavigateToSettings,
      );
    };
  }, []);

  // Show settings page if current page is settings
  if (currentPage === "settings") {
    return <Setting />;
  }

  // Show result page if game is finished
  if (gameState === "finished") {
    return <Result />;
  }

  return <Home />;
}

export default App;
