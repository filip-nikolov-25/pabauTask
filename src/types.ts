import { Dispatch, SetStateAction } from "react";

export interface CharacterType {
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
  
export  interface HomePageProps {
    allCharacters: CharacterType[] | null;
    error: string | null;
    setCharacters?:Dispatch<SetStateAction<CharacterType[]>>
    characters?:CharacterType[] 
    loadMoreCharacters: (page: number) => Promise<void>
  
  }
