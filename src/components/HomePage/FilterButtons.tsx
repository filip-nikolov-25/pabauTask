import {
  handleFilterByGender,
  handleFilterBySpecies,
  handleFilterByStatus,
} from "@/functions";
import { CharacterType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  selectedStatus: number | null;
  allCharacters: CharacterType[] | null;
  selectedSpecies: string | null;
  isByNameSorted: boolean | null;
  isByOriginSorted: boolean | null;
  selectedGender: string | null;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<number | null>>;
  setCharacters: Dispatch<SetStateAction<CharacterType[]>>;
  setSelectedGender: React.Dispatch<React.SetStateAction<string | null>>;
  handleSortByName: () => void;
  handleSortByOrigin: () => void;
}

const FilterButtons = ({
  selectedStatus,
  allCharacters,
  selectedSpecies,
  isByNameSorted,
  isByOriginSorted,
  selectedGender,
  setSelectedGender,
  setSelectedSpecies,
  setCharacters,
  setSelectedStatus,
  handleSortByName,
  handleSortByOrigin,
}: Props) => {
  // Get the unique species for the SPECIES filter, this creaete as much as buttons
  //as there are species cause they are all different on every page of the api

  //Also this can't be translated because they are created dinamically, the translate must come from backend or to make static few filters
  //but in that case we won't have all the filtering options for every card
  const uniqueSpeciesFilters = [
    ...new Set(allCharacters?.map((character) => character.species) || []),
  ];
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center mb-5">
        <span className="text-customLightSilver mr-5 text-xl">
          {t("status")}
        </span>
        <div className="flex justify-center mt-5 flex-wrap gap-3">
          <button
            className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
              selectedStatus === 0
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
            onClick={() => {
              if (allCharacters) {
                handleFilterByStatus(
                  0,
                  allCharacters,
                  selectedSpecies,
                  setSelectedStatus,
                  setCharacters!
                );
              }
            }}
          >
            {t("alive")}
          </button>
          <button
            className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
              selectedStatus === 1
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
            onClick={() => {
              if (allCharacters) {
                handleFilterByStatus(
                  1,
                  allCharacters,
                  selectedSpecies,
                  setSelectedStatus,
                  setCharacters!
                );
              }
            }}
          >
            {t("dead")}
          </button>
          <button
            className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
              selectedStatus === 2
                ? "bg-customMediumLightSilver border-2 shadow-xl shadow-white  border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
            onClick={() => {
              if (allCharacters) {
                handleFilterByStatus(
                  2,
                  allCharacters,
                  selectedSpecies,
                  setSelectedStatus,
                  setCharacters!
                );
              }
            }}
          >
            {t("unknown")}
          </button>
        </div>
      </div>
      <div className="text-center mb-5">
        <span className="text-customLightSilver mr-5 text-xl">
          {t("filterBySpecies")}
        </span>
        <div className="flex mt-5 justify-center flex-wrap gap-3">
          {uniqueSpeciesFilters.map((species) => (
            <button
              key={species}
              className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
                selectedSpecies === species
                  ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                  : "bg-customMediumDarkSilver shadow-md shadow-white "
              } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
              onClick={() =>
                handleFilterBySpecies(
                  species,
                  setSelectedSpecies,
                  allCharacters!,
                  selectedStatus,
                  setCharacters!
                )
              }
            >
              {species}
            </button>
          ))}
        </div>
      </div>
      <div className="text-center">
        <span className="text-xl mr-5 text-customLightSilver">
          {t("sortBy")}
        </span>
        <div className=" text-lg mt-5 mb-5">
          <button
            className="text-customMediumLightSilver border-2 border-white rounded-xl px-2 mr-3 transition-all duration-200 ease-in-out hover:shadow-xl hover:shadow-white hover:border-white"
            onClick={handleSortByName}
          >
            {t("sortByName")} :{" "}
            <span className="text-red-700">
              {isByNameSorted ? t("ascending") : t("descending")}
            </span>
          </button>
          <button
            className="text-customMediumLightSilver border-2 border-white rounded-xl px-2 mr-3 transition-all duration-200 ease-in-out hover:shadow-xl hover:shadow-white hover:border-white"
            onClick={handleSortByOrigin}
          >
            {t("sortByOrigin")} :{" "}
            <span className="text-red-700">
              {isByOriginSorted ? t("ascending") : t("descending")}
            </span>
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-20">
        <div className="text-center mb-5">
          <span className="text-xl mr-5 text-customLightSilver">
            {t("filterByGender")}
          </span>
          <div className="flex mt-5 justify-center flex-wrap gap-3">
            <button
              className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
                selectedGender === "Male"
                  ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                  : "bg-customMediumDarkSilver shadow-md shadow-white "
              } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
              onClick={() =>
                handleFilterByGender(
                  "Male",
                  setSelectedGender,
                  allCharacters!,
                  selectedSpecies,
                  selectedStatus,
                  setCharacters!
                )
              }
            >
              {t("male")}
            </button>
            <button
              className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
                selectedGender === "Female"
                  ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                  : "bg-customMediumDarkSilver shadow-md shadow-white "
              } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
              onClick={() =>
                handleFilterByGender(
                  "Female",
                  setSelectedGender,
                  allCharacters!,
                  selectedSpecies,
                  selectedStatus,
                  setCharacters!
                )
              }
            >
              {t("female")}
            </button>
            <button
              className={`mr-5 rounded-2xl px-10 transition-all duration-200 ease-in-out ${
                selectedGender === null
                  ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                  : "bg-customMediumDarkSilver shadow-md shadow-white "
              } hover:bg-customMediumLightSilver hover:shadow-xl hover:shadow-white hover:border-white`}
              onClick={() =>
                handleFilterByGender(
                  null,
                  setSelectedGender,
                  allCharacters!,
                  selectedSpecies,
                  selectedStatus,
                  setCharacters!
                )
              }
            >
              {t("all")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;
