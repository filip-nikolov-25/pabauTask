import i18n from "@/i18n";
import React from "react";

const Footer = () => {
  return (
<div className="border-t-2 border-l-2 border-r-2 sm:flex sm:justify-center sm:text-center lg:flex lg:justify-end lg:text-end rounded-t-xl backdrop-blur-sm bg-white/30">
  <div className="mx-auto w-11/12 py-2 flex justify-center lg:justify-end">
    <button
      className="px-10 transition-all mr-5 duration-200 ease-in-out hover:shadow-xl hover:shadow-white bg-customMediumDarkSilver rounded-xl border-2 border-white"
      onClick={() => i18n.changeLanguage("en")}
    >
      English
    </button>
    <button
      className="px-10 transition-all duration-200 ease-in-out hover:shadow-xl hover:shadow-white bg-customMediumDarkSilver rounded-xl border-2 border-white"
      onClick={() => i18n.changeLanguage("de")}
    >
      Deutsch
    </button>
  </div>
</div>

  
  );
};

export default Footer;
