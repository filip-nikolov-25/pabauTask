import { useTranslation } from "react-i18next";
import { HomePageProps } from "@/types";
import React, { useEffect, useState } from "react";
//@ts-expect-error aos has implicity any type 
import AOS from "aos";
import "aos/dist/aos.css";
import FilterButtons from "./FilterButtons";

const HomePage = ({
  allCharacters,
  error,
  setCharacters,
  characters,
}: HomePageProps) => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isByNameSorted, setIsByNameSorted] = useState<boolean | null>(false);
  const [isByOriginSorted, setIsByOriginSorted] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [noCards, setNoCards] = useState<boolean>(false);

  //Function for sorting by name from A to Z and Z to A
  const handleSortByName = () => {
    if (characters) {
      const toBeSorted = [...characters];
      const sorted = isByNameSorted
        ? toBeSorted.sort((a, b) => a.name.localeCompare(b.name))
        : toBeSorted.sort((a, b) => b.name.localeCompare(a.name));

      setCharacters!(sorted);
      setIsByNameSorted((prev) => !prev);
    }
  };
  //Function for sorting by origin from A to Z and Z to A
  const handleSortByOrigin = () => {
    if (characters) {
      const toBeSorted = [...characters];
      const sorted = isByOriginSorted
        ? toBeSorted.sort((a, b) => a.origin.name.localeCompare(b.origin.name))
        : toBeSorted.sort((a, b) => b.origin.name.localeCompare(a.origin.name));

      setCharacters!(sorted);
      setIsByOriginSorted((prev) => !prev);
    }
  };

  useEffect(() => {
    //Loading
    if (allCharacters === null) {
      setLoading(true);
    }
  }, [allCharacters]);

  const handleReset = () => {
    //Reset button
    setSelectedSpecies(null);
    setSelectedStatus(null);
    setSelectedGender(null);
    setCharacters!(allCharacters || []);
    setIsByNameSorted(null);
    setIsByOriginSorted(null);
  };

  useEffect(() => {
    if (allCharacters) {
      setCharacters!(allCharacters);
      setLoading(false);
    }
  }, [allCharacters]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (characters && characters.length === 0) {
      setNoCards(true);
    } else {
      setNoCards(false);
    }
  }, [characters]);

  return (
    <div className="bg-gradient-to-t from-customMediumLightSilver to-customDarkSilver">
      <h1 className="text-7xl text-white text-center py-20">{t("title")}</h1>
      {loading && <p>{t("loading")}</p>}
      {error && <p className="text-red-500">{t("error")}</p>}
      <FilterButtons
        setSelectedGender={setSelectedGender}
        allCharacters={allCharacters || []}
        setCharacters={setCharacters!}
        selectedStatus={selectedStatus}
        selectedSpecies={selectedSpecies}
        setSelectedSpecies={setSelectedSpecies}
        setSelectedStatus={setSelectedStatus}
        handleSortByName={handleSortByName}
        handleSortByOrigin={handleSortByOrigin}
        isByNameSorted={isByNameSorted}
        isByOriginSorted={isByOriginSorted}
        selectedGender={selectedGender}
      />
      <div className="text-center mt-7">
        <button
          className="text-red-600 py-1 bg-customLightSilver rounded-3xl px-10 font-bold"
          onClick={handleReset}
        >
          {t("reset")}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-11/12 mx-auto pt-20">
        {!noCards &&
          characters!.map((character) => (
            <div
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000"
              key={character.id}
              className="border-4 rounded-3xl drop-shadow-2xl shadow-2xl shadow-white border-white"
            >
              <div>
                <div className="w-full">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full rounded-t-2xl"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-red-700 ">
                    <span className="text-customLightSilver font-bold">
                      Name:{" "}
                    </span>
                    {character.name}
                  </h2>
                  <p className="text-red-700">
                    <span className="text-customLightSilver font-bold">
                      Status:{" "}
                    </span>
                    {character.status}
                  </p>
                  <p className="text-red-700">
                    <span className="text-customLightSilver font-bold">
                      Species:{" "}
                    </span>
                    {character.species}
                  </p>
                  <p className="text-red-700">
                    <span className="text-customLightSilver font-bold">
                      Gender:{" "}
                    </span>
                    {character.gender}
                  </p>
                  <p className="text-red-700">
                    <span className="text-customLightSilver font-bold">
                      Origin:{" "}
                    </span>
                    {character.origin.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* If there are not cards */}
      {noCards && (
        <div className="h-[50vh] text-center text-red-800 font-bold">
          <h3 className="text-5xl">No cards found</h3>
        </div>
      )}
    </div>
  );
};

export default HomePage;
