import { CharacterType } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  characters: CharacterType[];
}

const CharacterCards = ({ characters }: Props) => {
  const { t } = useTranslation();
  return (
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
        ))
      ) : (
        <div className="text-red-400">
          <p>{t("noCharacters")}</p>
          <p>{t("checkOtherStatus")}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterCards;
