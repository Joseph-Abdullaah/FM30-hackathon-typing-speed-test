import React from "react";
import { useTSTStore } from "../../store/TSTStore";
import logoLarge from "/src/assets/images/logo-large.svg";
import logoSmall from "/src/assets/images/logo-small.svg";
import personalBestIcon from "/src/assets/images/icon-personal-best.svg";
function Header() {
  const { bestWPM } = useTSTStore();
  return (
    <header className="p-4 sm:pt-8 sm:pb-5 lg:px-28 lg:py-8">
      <div className="flex justify-between items-center max-w-304 mx-auto">
        <picture>
          <source media="(min-width: 768px)" srcSet={logoLarge} />
          <img src={logoSmall} alt="logo" />
        </picture>

        <div className="flex justify-center items-center gap-2.5">
          <img
            className="w-[20.25px] h-4.5"
            src={personalBestIcon}
            alt="personal best icon"
          />
          <p className="flex gap-1 text-preset-4 text-neutral-400">
            <span className="hidden md:block">Personal</span>{" "}
            <span className="capitalize md:lowercase">best</span>:{" "}
            <span className="text-neutral-0 block">{bestWPM} WPM</span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
