import {
  handleFilterByGender,
  handleFilterBySpecies,
  handleFilterByStatus,
} from "@/functions";
import { CharacterType, HomePageProps } from "@/types";
import React, { useEffect, useState } from "react";
//@ts-ignore cannot find AOS
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = ({
  allCharacters,
  error,
  setCharacters,
  characters,
  loadMoreCharacters,
}: HomePageProps) => {
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isByNameSorted, setIsByNameSorted] = useState<boolean | null>(null);
  const [isByOriginSorted, setIsByOriginSorted] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState(1); //track the current opened page

  useEffect(() => {
    if (allCharacters === null) {
      setLoading(true); // setting the loading to true initially
    }
  }, [allCharacters]);

  // Get the unique species
  const uniqueSpecies = [
    ...new Set(allCharacters?.map((character) => character.species) || []),
  ];

  const handleReset = () => {
    //Reseting the filters
    setSelectedSpecies(null);
    setSelectedStatus(null);
    setSelectedGender(null); 
    setCharacters!(allCharacters || []);
    setIsByNameSorted(null);
    setIsByOriginSorted(null);
  };
  const handlePagination = (direction: "next" | "previous") => {
    let nextPage;
    if (page >= 0) {
      if (direction === "next") {
        nextPage = page + 1;
      } else {
        nextPage = page - 1;
      }
      if (nextPage > 0) {
        setPage(nextPage); 
        loadMoreCharacters(nextPage); //This loads the next page of characters
      }
    }
  };

  const handleSortByName = () => {
    if (characters) {
      const toBeSorted = [...characters];
      setIsByNameSorted(!isByNameSorted);
      let sorted;
      //sorting by on click so the first time when its clicked will sort in alphabetical order from a to z and when the second time is
      //clicked it will sort from z to a
      if (isByNameSorted) {
        sorted = toBeSorted.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        sorted = toBeSorted.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (setCharacters) {
        setCharacters(sorted);
      }
    }
  };

  const handleSortByOrigin = () => {
    const toBeSorted = [...characters!];
    const sorted = toBeSorted.sort((a, b) => {
      if (isByOriginSorted) {
        return a.origin.name.localeCompare(b.origin.name);
      } else {
        return b.origin.name.localeCompare(a.origin.name);
      }
    });
    setCharacters!(sorted);
    setIsByOriginSorted(!isByOriginSorted);
  };

  useEffect(() => {
    if (allCharacters && setCharacters) {
      setCharacters(allCharacters);
      setLoading(false); // Set loading to false when data is fetched
    }
  }, [allCharacters]);

  useEffect(() => {
    handleReset(); //reset when going on next page
  }, [page]);

  useEffect(() => {
    AOS.init(); 
  }, []);

  return (
    <div className="bg-gradient-to-t from-customMediumLightSilver to-customDarkSilver">
      <h1 className="text-5xl text-white text-center py-20">
        Rick and Morty Characters
      </h1>
      {loading && <p>Loading...</p>} {/* Show loading when true */}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Show error if present */}
      <div className="text-center mb-5">
        <span className="text-customLightSilver mr-5 text-xl">Status:</span>
        <div className="flex justify-center mt-5 flex-wrap gap-3">
          <button
            className={`mr-5 rounded-2xl px-10 ${
              selectedStatus === 0
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            }`}
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
            ALIVE
          </button>
          <button
            className={`mr-5 rounded-2xl px-10 ${
              selectedStatus === 1
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            }`}
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
            DEAD
          </button>
          <button
            className={`mr-5  rounded-2xl px-10 ${
              selectedStatus === 2
                ? "bg-customMediumLightSilver border-2 shadow-xl shadow-white  border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            }`}
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
            UNKNOWN
          </button>
        </div>
      </div>
      <div className="text-center mb-5">
        <span className="text-customLightSilver mr-5  text-xl">
          Filter by Species
        </span>
        <div className="flex mt-5 justify-center flex-wrap gap-3">
          {uniqueSpecies.map((species) => (
            <button
              key={species}
              className={`mr-5 rounded-2xl px-10 ${
                selectedSpecies === species
                  ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                  : "bg-customMediumDarkSilver shadow-md shadow-white "
              }`}
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
      <div className="flex justify-center mb-20">
        <span className="text-xl mr-5 text-customLightSilver">Sort by</span>
        <div className="">
          <button
            className="mr-5 bg-customMediumLightSilver border-2 border-white rounded-2xl px-10"
            onClick={handleSortByName}
          >
            <span>Name</span>
            {isByNameSorted ? (
              <i className="fa-solid fa-sort-up text-xl ml-2 text-white"></i>
            ) : (
              <i className="fa-solid fa-sort-down text-xl ml-2 text-white"></i>
            )}
          </button>
        </div>
        <button
          className="mr-5 bg-customMediumLightSilver border-2 border-white rounded-2xl px-10"
          onClick={handleSortByOrigin}
        >
          <span>Origin</span>
          {isByOriginSorted ? (
            <i className="fa-solid fa-sort-up text-xl text-white"></i>
          ) : (
            <i className="fa-solid fa-sort-down text-xl text-white"></i>
          )}
        </button>
      </div>
      <div className="text-center mb-5">
        <span className="text-xl mr-5  text-customLightSilver">
          Filter by Gender
        </span>
        <div className="flex mt-5 justify-center flex-wrap gap-3">
          <button
            className={`mr-5 rounded-2xl px-10 ${
              selectedGender === "Male"
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            }`}
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
            Male
          </button>
          <button
            className={`mr-5 rounded-2xl px-10 ${
              selectedGender === "Female"
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            }`}
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
            Female
          </button>
          <button
            className={`mr-5 rounded-2xl px-10 ${
              selectedGender === null
                ? "bg-customMediumLightSilver shadow-xl shadow-white  border-2 border-white"
                : "bg-customMediumDarkSilver shadow-md shadow-white "
            }`}
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
            All
          </button>
        </div>
      </div>
      <div className="text-center mt-7">
        <button
          className="text-red-600 py-1 bg-customLightSilver rounded-3xl px-10 font-bold"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-11/12 mx-auto pt-20">
        {characters && characters.length > 0 ? (
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
                    </span>{" "}
                    {character.name}
                  </h2>
                  <p className="text-red-700">
                    {" "}
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
                    </span>{" "}
                    {character.gender}
                  </p>
                  <p className="text-red-700">
                    <span className="text-customLightSilver font-bold">
                      Origin:{" "}
                    </span>{" "}
                    {character.origin.name}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-400">
            <p>No characters found for this species</p>
            <p>Check the other status for this species</p>
          </div>
        )}
      </div>
      <div className="flex justify-center py-10">
        <button
          onClick={() => handlePagination("previous")}
          className="bg-customMediumDarkSilver px-5 py-2 rounded-lg mr-5"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination("next")}
          className="bg-customMediumDarkSilver px-5 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
