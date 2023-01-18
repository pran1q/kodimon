import { Fragment, useState } from "react";

import getPokemonData from "../../utils/getPokemonData";
import BattlePhase from "./BattlePhase";
import Button from "../UI/Button";
import kodimon from "../../assets/kodimon1.png";
import styles from "./Home.module.css";

const Home = () => {
  const [pokemonOne, setPokemonOne] = useState({});
  const [pokemonTwo, setPokemonTwo] = useState({});

  const [newGame, setNewGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchPokemonHandler() {
    setIsLoading(true);
    setError(null);

    //fetching first pokemon
    getPokemonData()
      .then((data) => {
        setPokemonOne(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    //fetching second pokemon
    getPokemonData()
      .then((data) => {
        setPokemonTwo(data);
      })
      .catch((error) => {
        setError(error.message);
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 400);

    setNewGame(true);
  }

  const homeContent = (
    <div className={styles["home-container"]}>
      <img src={kodimon} alt="" />
      <Button onClick={fetchPokemonHandler}>
        {isLoading ? "Loading..." : "New game"}
      </Button>
      {!isLoading && error && <p>{error}</p>}
    </div>
  );

  const validNewGame =
    newGame &&
    !isLoading &&
    Object.keys(pokemonOne)?.length > 0 &&
    Object.keys(pokemonTwo)?.length > 0;

  return (
    <Fragment>
      {validNewGame ? (
        <BattlePhase
          pokemonDataOne={pokemonOne}
          pokemonDataTwo={pokemonTwo}
          newFetch={fetchPokemonHandler}
        />
      ) : (
        homeContent
      )}
    </Fragment>
  );
};

export default Home;
