import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useTSTStore } from "../store/TSTStore";
import Header from "../components/layout/Header";
import MainContent from "../components/layout/MainContent";
import CompletedIcon from "../assets/images/icon-completed.svg";
import StatRow from "../components/ui/StatRow";
import Button from "../components/ui/Button";
import RestartIcon from "../assets/images/icon-restart.svg";
import PatternStar1 from "../assets/images/pattern-star-1.svg";
import PatternStar2 from "../assets/images/pattern-star-2.svg";
import PBIcon from "../assets/images/icon-new-pb.svg";
import Chart from "../components/features/Chart";

function Result() {
  const {
    wpm,
    accuracy,
    charactersTyped,
    charactersCorrect,
    testResult,
    resetTest,
  } = useTSTStore();

  let title = "Test Complete!";
  let message = "Solid run. Keep Pushing to beat you high score.";
  let iconSrc = CompletedIcon;

  if (testResult === "baseline") {
    title = "Baseline Established!";
    message =
      "You've set the bar. Now the real challenge begins—time to beat it.";
    iconSrc = CompletedIcon;
  } else if (testResult === "new_pb") {
    title = "High Score Smashed!";
    message = "You're getting faster. That was incredible typing.";
    iconSrc = PBIcon;
  } else {
    // Normal / Default
    title = "Test Complete!";
    message = "Solid run. Keep Pushing to beat you high score.";
    iconSrc = CompletedIcon;
  }

  useEffect(() => {
    if (testResult === "new_pb") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e2b714", "#ffffff", "#3295db"],
      });
    }
  }, [testResult]);

  return (
    <>
      <Header />
      <MainContent>
        <div className="relative max-w-304 w-full mx-auto flex flex-col items-center gap-6 md:gap-8 mt-8 md:mt-20 lg:mt-8">
          <img
            src={PatternStar2}
            alt="Pattern stars"
            className="absolute top-7 md:top-32 left-1.5 max-md:w-5.25 max-md:h-5.25"
          />
          <img
            src={PatternStar1}
            alt="Pattern stars"
            className="absolute -bottom-10 md:bottom-9 right-1.5 max-md:w-9.75 max-md:h-9.75"
          />

          <div className="relative flex items-center justify-center">
            {testResult !== "new_pb" && (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 md:w-32 md:h-32 rounded-full bg-green-500/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-17 h-17 md:w-24 md:h-24 rounded-full bg-green-500/15"></div>
              </>
            )}
            <img
              className="relative z-10 w-12 h-12 md:h-16 md:w-16"
              src={iconSrc}
              alt="Completed Icon"
            />
          </div>
          <div className="flex flex-col items-center text-center gap-4 pt-4 md:pt-6">
            <h1 className="text-preset-1-mobile md:text-preset-1">{title}</h1>
            <p className="text-preset-5 md:text-preset-3 text-neutral-400">
              {message}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full pb-8 pt-5">
            <StatRow label="WPM:" value={wpm} />
            <StatRow label="Accuracy:" value={accuracy} />
            <StatRow
              label="Characters:"
              value={`${charactersTyped} / ${charactersCorrect}`}
            />
          </div>

          {/* Performance Chart */}
          <Chart />

          <Button variant="secondary" size="lg" onClick={resetTest}>
            Go Again{" "}
            <img
              src={RestartIcon}
              alt="Restart icon"
              className="ml-2.5 brightness-0"
            />
          </Button>
        </div>
      </MainContent>
    </>
  );
}

export default Result;
