import { Fragment, useState } from "react";
import Home from "./Home";
import Pokemon from "../Pokemon";
import Attack from "../Attack";
import Menu from "../Menu";
import Logs from "../Logs";
import Button from "../UI/Button";

import styles from "./BattlePhase.module.css";

const BattlePhase = ({ pokemonDataOne, pokemonDataTwo, newFetch }) => {
  const [newGameValue, setNewGameValue] = useState(true);
  const [homeValue, setHomeValue] = useState(false);

  const SPEED_1 = pokemonDataOne.speed;
  const SPEED_2 = pokemonDataTwo.speed;

  const [isActiveArrow, setIsActiveArrow] = useState(
    SPEED_1 >= SPEED_2 ? styles.attack : ""
  );

  const [attackerHp, setAttackerHp] = useState(pokemonDataOne.hp);
  const [defenderHp, setDefenderHp] = useState(pokemonDataTwo.hp);

  const [hpPercentOne, setHpPercentOne] = useState(100);
  const [hpPercentTwo, setHpPercentTwo] = useState(100);

  const [logs, setLogs] = useState([]);

  const attackFunction = () => {
    if (isActiveArrow === styles.attack) {
      if (Math.floor(Math.random() * 100 + 1) > 20) {
        const attack =
          ((pokemonDataOne.attack / 2) *
            (pokemonDataTwo.defense >= 90
              ? 10
              : 100 - pokemonDataTwo.defense)) /
          100;

        let HP_LEFT = defenderHp - attack;

        setDefenderHp(HP_LEFT);

        setHpPercentTwo(
          Math.ceil((HP_LEFT / pokemonDataTwo.hp) * 100) <= 0
            ? 0
            : Math.ceil((HP_LEFT / pokemonDataTwo.hp) * 100)
        );

        HP_LEFT <= 0
          ? setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataOne.name} attacked ${
                pokemonDataTwo.name
              } for ${attack.toFixed(2)} dmg`,
              `${pokemonDataTwo.name} died`,
            ])
          : setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataOne.name} attacked ${
                pokemonDataTwo.name
              } for ${attack.toFixed(2)} dmg`,
            ]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          `${pokemonDataOne.name} missed ${pokemonDataTwo.name}`,
        ]);
      }

      setIsActiveArrow(isActiveArrow === "" ? styles.attack : "");
    } else if (isActiveArrow === "") {
      if (Math.floor(Math.random() * 100 + 1) > 20) {
        const attack =
          ((pokemonDataTwo.attack / 2) *
            (pokemonDataOne.defense >= 90
              ? 10
              : 100 - pokemonDataOne.defense)) /
          100;

        let HP_LEFT = attackerHp - attack;

        setAttackerHp(HP_LEFT.toFixed(2));

        setHpPercentOne(
          Math.ceil((HP_LEFT / pokemonDataOne.hp) * 100) <= 0
            ? 0
            : Math.ceil((HP_LEFT / pokemonDataOne.hp) * 100)
        );

        HP_LEFT <= 0
          ? setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataTwo.name} attacked ${
                pokemonDataOne.name
              } for ${attack.toFixed(2)} dmg`,
              `${pokemonDataOne.name} died`,
            ])
          : setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataTwo.name} attacked ${
                pokemonDataOne.name
              } for ${attack.toFixed(2)} dmg`,
            ]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          `${pokemonDataTwo.name} missed ${pokemonDataOne.name}`,
        ]);
      }
      setIsActiveArrow(isActiveArrow === "" ? styles.attack : "");
    }
  };

  const attackHandler = () => {
    //if pokemon on right attacks first
    if (SPEED_1 < SPEED_2) {
      attackFunction();
    }

    //if pokemon on left attackts first
    else if (SPEED_1 >= SPEED_2) {
      attackFunction();
    }
  };

  const onHomeClickHandler = () => {
    newGameValue ? setNewGameValue(false) : setNewGameValue(true);
    homeValue ? setHomeValue(false) : setHomeValue(true);
  };

  let innerHealthBar1 =
    hpPercentOne >= 50
      ? "var(--green-light)"
      : hpPercentOne < 50 && hpPercentOne >= 30
      ? "var(--orange-light)"
      : "var(--red-light)";

  let innerHealthBar2 =
    hpPercentTwo >= 50
      ? "var(--green-light)"
      : hpPercentTwo < 50 && hpPercentTwo >= 30
      ? "var(--orange-light)"
      : "var(--red-light)";

  const healthStyle1 = {
    width: `${hpPercentOne}%`,
    backgroundColor: `${innerHealthBar1}`,
  };

  const healthStyle2 = {
    width: `${hpPercentTwo}%`,
    backgroundColor: `${innerHealthBar2}`,
  };

  const winningPokemon =
    SPEED_1 < SPEED_2 && isActiveArrow === styles.attack && attackerHp <= 0
      ? pokemonDataTwo.name
      : SPEED_1 < SPEED_2 && isActiveArrow === "" && defenderHp <= 0
      ? pokemonDataOne.name
      : SPEED_1 >= SPEED_2 && isActiveArrow === styles.attack && attackerHp <= 0
      ? pokemonDataTwo.name
      : SPEED_1 >= SPEED_2 && isActiveArrow === "" && defenderHp <= 0
      ? pokemonDataOne.name
      : "";

  const menuModal = (
    <div className={styles.backdrop}>
      <p>{winningPokemon} won!</p>
      <Menu className={styles["menu-modal"]}>
        <Button onClick={onHomeClickHandler} className={styles.button}>
          Home
        </Button>
        <Button onClick={newFetch} className={styles.button}>
          New game
        </Button>
        <Button className={styles.button}>New opponent</Button>
      </Menu>
    </div>
  );

  const battlePhase = (
    <div className={styles["battle-phase-container"]}>
      {winningPokemon && menuModal}
      <div className={styles.battleground}>
        <Pokemon
          name={pokemonDataOne.name}
          image={pokemonDataOne.image}
          hp={pokemonDataOne.hp}
          attack={pokemonDataOne.attack}
          defense={pokemonDataOne.defense}
          speed={pokemonDataOne.speed}
          hpPercent={hpPercentOne}
          style={healthStyle1}
        />
        <Attack className={isActiveArrow}>
          <Button onClick={attackHandler}>Attack!</Button>
        </Attack>
        <Pokemon
          name={pokemonDataTwo.name}
          image={pokemonDataTwo.image}
          hp={pokemonDataTwo.hp}
          attack={pokemonDataTwo.attack}
          defense={pokemonDataTwo.defense}
          speed={pokemonDataTwo.speed}
          hpPercent={hpPercentTwo}
          style={healthStyle2}
        />
      </div>
      <div className={styles["menu-logs"]}>
        <Menu>
          <Button onClick={onHomeClickHandler} className={styles.button}>
            Home
          </Button>
          <Button onClick={newFetch} className={styles.button}>
            New game
          </Button>
          <Button className={styles.button}>New opponent</Button>
        </Menu>
        <div className={styles["logs-container"]}>
          <p>Logs</p>
          <Logs>
            {logs.map((logs) => (
              <p key={Math.random()}>{logs}</p>
            ))}
          </Logs>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {homeValue ? (
        <Home>
          <Button onClick={onHomeClickHandler}>New Game</Button>
        </Home>
      ) : (
        battlePhase
      )}
    </Fragment>
  );
};

export default BattlePhase;
