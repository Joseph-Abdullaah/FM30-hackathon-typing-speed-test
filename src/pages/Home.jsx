import React from "react";
import { useTSTStore } from "../store/TSTStore";
import Header from "../components/layout/Header";
import MainContent from "../components/layout/MainContent";
import Stats from "../components/ui/Stats";
import TypingArea from "../components/TypingArea";
import Button from "../components/ui/Button";
import RestartIcon from "../assets/images/icon-restart.svg";
import StartModal from "../components/ui/StartModal";
import KeyboardHeatmap from "../components/ui/KeyboardHeatmap";

function Home() {
  const { resetTest, gameState, showHeatmap } = useTSTStore();

  return (
    <>
      <Header />
      <MainContent>
        <Stats />
        <TypingArea className="border-b border-neutral-700">
          {(gameState === "idle" || gameState === "paused") && (
            <div className="absolute inset-0 z-10">
              <StartModal />
            </div>
          )}
        </TypingArea>
        {showHeatmap && <KeyboardHeatmap />}
        {gameState !== "idle" && (
          <Button
            variant="ghost"
            size="lg"
            className="w-fit mx-auto mt-8"
            onClick={resetTest}
            data-action="restart"
          >
            Restart Test
            <img src={RestartIcon} alt="Restart icon" className="ml-3" />
          </Button>
        )}
      </MainContent>
    </>
  );
}

export default Home;
