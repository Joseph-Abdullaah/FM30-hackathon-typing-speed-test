import React from "react";
import { useTSTStore } from "./store/TSTStore";
import Home from "./pages/Home";
import Result from "./pages/Result";
function App() {
  const { gameState } = useTSTStore();
  return gameState === "finished" ? <Result /> : <Home />;
}

export default App;
