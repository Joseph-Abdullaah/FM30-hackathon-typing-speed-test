import React from "react";
import Header from "../components/layout/Header";
import MainContent from "../components/layout/MainContent";
import Button from "../components/ui/Button";
import Themes from "../components/features/Themes";
import Sound from "../components/features/Sound";
import FontSize from "../components/features/FontSize";
import Caret from "../components/features/Caret";
import Category from "../components/features/Category";
import HeatmapToggle from "../components/features/HeatmapToggle";
import { useTSTStore } from "../store/TSTStore";

function Setting() {
  const { resetTest } = useTSTStore();

  const handleBackToTest = () => {
    resetTest();
    // Navigate back to home (App component handles this)
    window.dispatchEvent(new CustomEvent("navigateToHome"));
  };

  return (
    <>
      <Header />
      <MainContent>
        <div className="max-w-304 mx-auto">
          <h1 className="text-preset-1-mobile md:text-preset-1 text-neutral-0 mb-8">
            Settings
          </h1>

          {/* Appearance Section */}
          <section className="mb-8 p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
            <h2 className="text-preset-3-mobile md:text-preset-3 text-neutral-0 mb-6">
              Appearance
            </h2>
            <div className="space-y-6">
              <Themes />
              <hr className="border-neutral-700" />
              <FontSize />
            </div>
          </section>

          {/* Typing Experience Section */}
          <section className="mb-8 p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
            <h2 className="text-preset-3-mobile md:text-preset-3 text-neutral-0 mb-6">
              Typing Experience
            </h2>
            <div className="space-y-6">
              <Caret />
              <hr className="border-neutral-700" />
              <Sound />
            </div>
          </section>

          {/* Content Section */}
          <section className="mb-8 p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
            <h2 className="text-preset-3-mobile md:text-preset-3 text-neutral-0 mb-6">
              Content
            </h2>
            <Category />
          </section>

          {/* Display Section */}
          <section className="mb-8 p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
            <h2 className="text-preset-3-mobile md:text-preset-3 text-neutral-0 mb-6">
              Display
            </h2>
            <HeatmapToggle />
          </section>

          {/* Back Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleBackToTest}
              className="w-fit"
            >
              Back to Test
            </Button>
          </div>
        </div>
      </MainContent>
    </>
  );
}

export default Setting;
