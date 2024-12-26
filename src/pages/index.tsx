import client from "@/components/HomePage/Apolo_Client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";

interface CharacterType {
  __typename: string;
  id: string;
  name: string;
  status: string;
  image: string;
  origin: OriginTypeDataFromCharacter;
  species: string;
  gender: string;
}

interface OriginTypeDataFromCharacter {
  name: string;
  __typename: string;
}

interface Props {
  allCharacters: CharacterType[];
}

const Home = ({ allCharacters }: Props) => {
  const [characters, setCharacters] = useState(allCharacters);
  const [isAliveOrDeadorUnknown, setIsAliveOrDeadOrUnknown] = useState<
    number | null
  >(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [isByNameSorted, setIsByNameSorted] = useState(true);
  const [isByOriginSorted, setIsByOriginSorted] = useState(true);

  console.log(characters,"look ")

  // Get the unique species
  const uniqueSpecies = [
    ...new Set(allCharacters.map((character) => character.species)),
  ];

  const handleFilterByStatus = (status: number) => {
    let filtered: CharacterType[] = [];

    // Filter based on the given status
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

    // Apply species filter if selected
    if (selectedSpecies) {
      filtered = filtered.filter(
        (character) => character.species === selectedSpecies
      );
    }

    setIsAliveOrDeadOrUnknown(status);
    setCharacters(filtered);
  };
  const handleFilterBySpecies = (species: string) => {
    setSelectedSpecies(species); // Set the clicked species
    let filtered = allCharacters.filter(
      (character) => character.species.toLowerCase() === species.toLowerCase()
    );

    // Filter logic based on status
    if (isAliveOrDeadorUnknown === null) {
      filtered = filtered.filter((character) => character.status);
    } else if (isAliveOrDeadorUnknown === 0) {
      filtered = filtered.filter((character) => character.status === "Alive");
    } else if (isAliveOrDeadorUnknown === 1) {
      filtered = filtered.filter((character) => character.status === "Dead");
    } else if (isAliveOrDeadorUnknown === 2) {
      filtered = filtered.filter((character) => character.status === "unknown");
    }

    setCharacters(filtered);
  };
  useEffect(() => {
    setCharacters(allCharacters);
  }, [allCharacters]);

  const handleSortByName = () => {
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
    setCharacters(sorted);
  };

  const handleSortByOrigin = () => {
    setIsByOriginSorted(!isByOriginSorted);

    const toBeSorted = [...characters];
    const sorted = toBeSorted.filter((character) => {
      //sorting by if there is an origin or the origin is unknown
      if (isByOriginSorted) {
        if (character.origin.name !== "unknown") {
          return character;
        }
      }else{
        return character.origin.name === "unknown"
      }
    });
    setCharacters(sorted);
  };

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div>
        <span>Filter by</span>
        <button
          className={`mr-5 bg-red-500 rounded-2xl px-10 ${
            isAliveOrDeadorUnknown === 0 && "bg-green-400"
          }`}
          onClick={() => handleFilterByStatus(0)}
        >
          Status: ALIVE
        </button>
        <button
          className={`mr-5 bg-red-500 rounded-2xl px-10 ${
            isAliveOrDeadorUnknown === 1 && "bg-green-400"
          }`}
          onClick={() => handleFilterByStatus(1)}
        >
          Status: DEAD
        </button>
        <button
          className={`mr-5 bg-red-500 rounded-2xl px-10 ${
            isAliveOrDeadorUnknown === 2 && "bg-green-400"
          }`}
          onClick={() => handleFilterByStatus(2)}
        >
          Status: UNKNOWN
        </button>
      </div>
      <div>
        <h2>Filter by Species</h2>
        {uniqueSpecies.map((species) => (
          <button
            key={species}
            className={`mr-5 rounded-2xl px-10 ${
              selectedSpecies === species ? "bg-green-400" : "bg-red-500"
            }`}
            onClick={() => handleFilterBySpecies(species)}
          >
            {species}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedSpecies(null);
            setIsAliveOrDeadOrUnknown(null);
            setCharacters(allCharacters);
          }}
        >
          RESET
        </button>
      </div>
      <div>
        <span>Sort by</span>
        <button className="mr-5 bg-red-500 rounded-2xl px-10">Name</button>
        <button className="mr-5 bg-red-500 rounded-2xl px-10">Origin</button>
      </div>
      <div>
        <button className="bg-pink-600 mt-10 mb-10" onClick={handleSortByName}>
          SORT BY NAME NAME{" "}
        </button>
      </div>
      <div>
        <button
          className="bg-cyan-600 mt-10 mb-10"
          onClick={handleSortByOrigin}
        >
          SORT BY ORIGIN{" "}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 ">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} className="border-2 border-black mr-3 ">
              <div>
                <div className="w-full">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full"
                  />
                </div>
                <h2>Name: {character.name}</h2>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Origin: {character.origin.name}</p>
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
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            status
            image
            origin {
              name
            }
            species
            gender
          }
        }
      }
    `,
  });

  return {
    props: {
      allCharacters: data.characters.results,
    },
  };
}
