import React from "react";
import logoLarge from "/src/assets/images/logo-large.svg";
import logoSmall from "/src/assets/images/logo-small.svg";
import personalBestIcon from "/src/assets/images/icon-personal-best.svg";
function Header() {
  return (
    <header className="p-4 sm:p-8 lg:px-28 lg:py-8">
      <div className="flex justify-between items-center max-w-304 mx-auto">
        <picture>
          <source media="(min-width: 769px)" srcSet={logoLarge} />
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
            <span className="text-neutral-0 block">92 WPM</span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
