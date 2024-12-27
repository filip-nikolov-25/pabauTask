import client from "@/components/HomePage/apolo_client";
import HomePage from "@/components/HomePage/HomePage";
import { CharacterType, HomePageProps } from "@/types";
import { gql } from "@apollo/client";
import { useState } from "react";

const Home = ({ allCharacters, error }: HomePageProps) => {
  const [characters, setCharacters] = useState<CharacterType[]>(allCharacters || []);
  const loadMoreCharacters = async (page: number) => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            characters(page: ${page}) {
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

      // Page update and new charachters are added
      setCharacters(data.characters.results);
    } catch (error) {
      console.error("Error happened", error);
    }
  };

  return (
    <HomePage allCharacters={allCharacters} error={error} loadMoreCharacters={loadMoreCharacters} setCharacters={setCharacters} characters={characters} />
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(page: 3) {
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
        error: null,
      },
    };
  } catch (error) {
    console.error("Error happened", error);

    return {
      props: {
        allCharacters: null,
        error: "Error loading the characters.",
      },
    };
  }
}
