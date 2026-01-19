import React from "react";
import { useNavigate } from "react-router";
import Header from "../components/layout/Header";
import MainContent from "../components/layout/MainContent";
import Themes from "../components/features/Themes";
import Sound from "../components/features/Sound";
import FontSize from "../components/features/FontSize";
import Caret from "../components/features/Caret";
import Category from "../components/features/Category";
import HeatmapToggle from "../components/features/HeatmapToggle";

function Setting() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <MainContent>
        <div className="max-w-304 mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-0"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
            <h1 className="text-preset-1-mobile md:text-preset-1 text-neutral-0">
              Settings
            </h1>
          </div>

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
        </div>
      </MainContent>
    </>
  );
}

export default Setting;
