import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
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
  const resultRef = useRef(null);

  let title = "Test Complete!";
  let message = "Solid run. Keep pushing to beat your high score.";
  let iconSrc = CompletedIcon;
  let buttonText = "Go Again";

  if (testResult === "baseline") {
    title = "Baseline Established!";
    message =
      "You've set the bar. Now the real challenge begins—time to beat it.";
    iconSrc = CompletedIcon;
    buttonText = "Beat This Score";
  } else if (testResult === "new_pb") {
    title = "High Score Smashed!";
    message = "You're getting faster. That was incredible typing.";
    iconSrc = PBIcon;
    buttonText = "Beat This Score";
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

  const [isCapturing, setIsCapturing] = React.useState(false);

  const handleDownload = async () => {
    if (resultRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        // Wait longer for Recharts animations and layout to be completely ready
        await new Promise((r) => setTimeout(r, 1000));

        const canvas = await html2canvas(resultRef.current, {
          backgroundColor: "#121212",
          scale: 2,
          useCORS: true,
          logging: true, // Internal debug logging enabled
          scrollX: 0,
          scrollY: 0,
          windowWidth: resultRef.current.scrollWidth,
          windowHeight: resultRef.current.scrollHeight,
          onclone: (clonedDoc) => {
            // Find the result card in the cloned document
            const resultCard =
              clonedDoc.querySelector(".max-w-304"); /* The main container */
            if (resultCard) {
              resultCard.style.padding = "40px";
              resultCard.style.borderRadius = "24px";

              // CRITICAL: Recharts ResponsiveContainer often collapses in the clone
              // Find the chart container and force its dimensions
              const chartContainer = resultCard.querySelector(
                ".h-64, .h-80, .h-96",
              );
              if (chartContainer) {
                chartContainer.style.width = "800px";
                chartContainer.style.height = "400px";
                chartContainer.style.display = "block";

                // Force any SVG within to have explicit dimensions
                const svgs = chartContainer.querySelectorAll("svg");
                svgs.forEach((svg) => {
                  svg.setAttribute("width", "800");
                  svg.setAttribute("height", "400");
                  svg.style.width = "800px";
                  svg.style.height = "400px";
                });
              }
            }
          },
        });

        const link = document.createElement("a");
        link.download = `tst-result-${new Date().getTime()}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
      } catch (err) {
        console.error("Screenshot capture detail error:", err);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const accuracyColor = accuracy < 95 ? "text-red-500" : "text-green-500";
  const errorCount = charactersTyped - charactersCorrect;

  return (
    <>
      <Header />
      <MainContent>
        <div
          ref={resultRef}
          className="relative max-w-304 w-full mx-auto flex flex-col items-center gap-6 md:gap-8 mt-8 md:mt-20 lg:mt-8 p-4 bg-neutral-900 rounded-2xl"
        >
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
            <StatRow label="WPM:" value={wpm} valueClassName="text-neutral-0" />
            <StatRow
              label="Accuracy:"
              value={`${accuracy}%`}
              valueClassName={accuracyColor}
            />
            <StatRow
              label="Characters:"
              value={
                <span className="text-green-500">
                  {charactersCorrect}{" "}
                  <span className="text-red-500">/ {errorCount}</span>
                </span>
              }
            />
          </div>

          <Chart />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pb-12">
          <Button variant="secondary" size="lg" onClick={resetTest}>
            {buttonText}{" "}
            <img
              src={RestartIcon}
              alt="Restart icon"
              className="ml-2.5 brightness-0"
            />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownload}
            disabled={isCapturing}
          >
            {isCapturing ? "Capturing..." : "Download Result"}
          </Button>
        </div>
      </MainContent>
    </>
  );
}

export default Result;
