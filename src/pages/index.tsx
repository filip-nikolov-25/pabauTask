import client from "@/pages/api/apolo_client";
import HomePage from "@/components/HomePage/HomePage";
import { CharacterType, HomePageProps } from "@/types";
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";

const Home = ({ allCharacters, error }: HomePageProps) => {
  const [characters, setCharacters] = useState<CharacterType[]>(allCharacters || []);
  const [page, setPage] = useState(1); //set page

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

      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...data.characters.results,
      ]);
    } catch (error) {
      console.error("Error happened", error);
    }
  };

  // Infinite Scroll 
  const handleScroll = () => {
    //calculating when the user is at the bottom of the page
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      setPage(() => {
        const nextPage = page + 1;
        loadMoreCharacters(nextPage);
        return nextPage;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HomePage
      allCharacters={allCharacters}
      error={error}
      loadMoreCharacters={loadMoreCharacters}
      setCharacters={setCharacters}
      characters={characters}
    />
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
