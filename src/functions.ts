import { CharacterType } from "./types";

export const handleFilterByStatus = (
  status: number,
  allCharacters: CharacterType[],
  selectedSpecies: string | null,
  setSelectedStatus: (status: number) => void,
  setCharacters: (arr: CharacterType[]) => void
) => {
  let filtered: CharacterType[] = [];

  // Filter based on the given status
  if (allCharacters) {
    // checking if the allCharacters data is not null
    if (status === 0) {
      filtered = allCharacters.filter(
        (character) => character.status === "Alive"
      );
    } else if (status === 1) {
      filtered = allCharacters.filter(
        (character) => character.status === "Dead"
      );
    } else if (status === 2) {
      filtered = allCharacters.filter(
        (character) => character.status === "unknown"
      );
    }
  }

  // Apply species filter if selected
  if (selectedSpecies) {
    filtered = filtered.filter(
      (character) => character.species === selectedSpecies
    );
  }

  setSelectedStatus(status);
  setCharacters(filtered);
};

export const handleFilterBySpecies = (
  species: string,
  setSelectedSpecies: (species: string | null) => void,
  allCharacters: CharacterType[],
  selectedStatus: number | null,
  setCharacters: (character: CharacterType[]) => void
) => {
  setSelectedSpecies(species); // Set the clicked species
  let filtered = allCharacters.filter(
    (character) => character.species.toLowerCase() === species.toLowerCase()
  );

  // Filter logic based on STATUS
  if (selectedStatus === null) {
    filtered = filtered.filter((character) => character.status);
  } else if (selectedStatus === 0) {
    filtered = filtered.filter((character) => character.status === "Alive");
  } else if (selectedStatus === 1) {
    filtered = filtered.filter((character) => character.status === "Dead");
  } else if (selectedStatus === 2) {
    filtered = filtered.filter((character) => character.status === "unknown");
  }

  setCharacters(filtered);
};

export const handleFilterByGender = (
  gender: string | null,
  setSelectedGender: (gender: string | null) => void,
  allCharacters: CharacterType[],
  selectedSpecies: string | null,
  selectedStatus: number | null,
  setCharacters: (arr: CharacterType[]) => void
) => {
  setSelectedGender(gender); // Set the clicked gender filter

  let filtered = allCharacters;

  // Filter by gender
  if (gender) {
    filtered = filtered.filter((character) => character.gender === gender);
  }

  // Apply species filter if selected
  if (selectedSpecies) {
    filtered = filtered.filter(
      (character) => character.species === selectedSpecies
    );
  }

  // Apply status filter if selected
  if (selectedStatus !== null) {
    if (selectedStatus === 0) {
      filtered = filtered.filter((character) => character.status === "Alive");
    } else if (selectedStatus === 1) {
      filtered = filtered.filter((character) => character.status === "Dead");
    } else if (selectedStatus === 2) {
      filtered = filtered.filter((character) => character.status === "unknown");
    }
  }

  setCharacters(filtered); // Update the characters state with the FILTERED LIST
};
