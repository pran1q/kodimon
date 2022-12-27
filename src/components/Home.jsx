import { useState } from "react";
import kodimon from "../images/kodimon1.png";
import styles from "./Home.module.css";

import BattlePhase from "./BattlePhase";
import Button from "./Button";

const Home = () => {
  const [newGame, setNewGame] = useState(false);
  const [pokemonOne, setPokemonOne] = useState([]);
  const [pokemonTwo, setPokemonTwo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPokemonHandler() {
    setIsLoading(true);
    setError(null);

    try {
      let randomPokemonOne = Math.floor(Math.random() * 905 + 1);
      let randomPokemonTwo = Math.floor(Math.random() * 905 + 1);

      //making sure we always get 2 distinct pokemon
      do {
        randomPokemonOne = Math.floor(Math.random() * 905 + 1);
      } while (randomPokemonOne === randomPokemonTwo);

      const responseOne = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonOne}`
      );
      const responseTwo = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonTwo}`
      );

      if (!responseOne.ok && !responseTwo.ok) {
        throw new Error("Something went wrong!");
      }
      const dataOne = await responseOne.json();
      const dataTwo = await responseTwo.json();

      const transformedPokemonOne = [dataOne].map((pokemonData) => {
        return [
          pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
          pokemonData.sprites.other["official-artwork"].front_default,
          pokemonData.stats[0].base_stat,
          pokemonData.stats[1].base_stat,
          pokemonData.stats[2].base_stat,
          pokemonData.stats[5].base_stat,
        ];
      });

      const transformedPokemonTwo = [dataTwo].map((pokemonData) => {
        return [
          pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
          pokemonData.sprites.other["official-artwork"].front_default,
          pokemonData.stats[0].base_stat,
          pokemonData.stats[1].base_stat,
          pokemonData.stats[2].base_stat,
          pokemonData.stats[5].base_stat,
        ];
      });

      setPokemonOne(transformedPokemonOne[0]);
      setPokemonTwo(transformedPokemonTwo[0]);

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
    setNewGame(true);
  }

  //fetching end

  const homeContent = (
    <div className={styles["home-container"]}>
      <img src={kodimon} alt="" />
      <Button onClick={fetchPokemonHandler}>
        {isLoading ? "Loading..." : "New game"}
      </Button>
      {!isLoading && error && <p>{error}</p>}
    </div>
  );

  return (
    <>
      {newGame &&
      !isLoading &&
      pokemonOne?.length > 0 &&
      pokemonTwo?.length > 0 ? (
        <BattlePhase
          pokemonDataOne={pokemonOne}
          pokemonDataTwo={pokemonTwo}
          newFetch={fetchPokemonHandler}
        />
      ) : (
        homeContent
      )}
    </>
  );
};

export default Home;
