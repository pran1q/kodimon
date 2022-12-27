import { useState } from "react";
import Home from "./Home";
import Menu from "./Menu";
import Button from "./Button";
import Pokemon from "./Pokemon";
import Attack from "./Attack";
import Container from "./Container";

import styles from "./BattlePhase.module.css";

const BattlePhase = ({ pokemonDataOne, pokemonDataTwo, newFetch }) => {
  const [newGameValue, setNewGameValue] = useState(true);
  const [homeValue, setHomeValue] = useState(false);

  const SPEED_1 = pokemonDataOne[5];
  const SPEED_2 = pokemonDataTwo[5];

  const [isActiveArrow, setIsActiveArrow] = useState(
    SPEED_1 >= SPEED_2 ? styles.attack : ""
  );

  const [attackerHp, setAttackerHp] = useState(pokemonDataOne[2]);
  const [defenderHp, setDefenderHp] = useState(pokemonDataTwo[2]);

  const [hpPercentOne, setHpPercentOne] = useState(100);
  const [hpPercentTwo, setHpPercentTwo] = useState(100);

  const [logs, setLogs] = useState([]);

  const attackFunction = () => {
    if (isActiveArrow === styles.attack) {
      if (Math.floor(Math.random() * 100 + 1) > 20) {
        const attack =
          ((pokemonDataOne[3] / 2) *
            (pokemonDataTwo[4] >= 90 ? 10 : 100 - pokemonDataTwo[4])) /
          100;

        let HP_LEFT = defenderHp - attack;

        setDefenderHp(HP_LEFT);

        setHpPercentTwo(
          Math.ceil((HP_LEFT / pokemonDataTwo[2]) * 100) <= 0
            ? 0
            : Math.ceil((HP_LEFT / pokemonDataTwo[2]) * 100)
        );

        HP_LEFT <= 0
          ? setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataOne[0]} attacked ${
                pokemonDataTwo[0]
              } for ${attack.toFixed(2)} dmg`,
              `${pokemonDataTwo[0]} died`,
            ])
          : setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataOne[0]} attacked ${
                pokemonDataTwo[0]
              } for ${attack.toFixed(2)} dmg`,
            ]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          `${pokemonDataOne[0]} missed ${pokemonDataTwo[0]}`,
        ]);
      }

      setIsActiveArrow(isActiveArrow === "" ? styles.attack : "");
    } else if (isActiveArrow === "") {
      if (Math.floor(Math.random() * 100 + 1) > 20) {
        const attack =
          ((pokemonDataTwo[3] / 2) *
            (pokemonDataOne[4] >= 90 ? 10 : 100 - pokemonDataOne[4])) /
          100;

        let HP_LEFT = attackerHp - attack;

        setAttackerHp(HP_LEFT.toFixed(2));

        setHpPercentOne(
          Math.ceil((HP_LEFT / pokemonDataOne[2]) * 100) <= 0
            ? 0
            : Math.ceil((HP_LEFT / pokemonDataOne[2]) * 100)
        );

        HP_LEFT <= 0
          ? setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataTwo[0]} attacked ${
                pokemonDataOne[0]
              } for ${attack.toFixed(2)} dmg`,
              `${pokemonDataOne[0]} died`,
            ])
          : setLogs((prevLogs) => [
              ...prevLogs,
              `${pokemonDataTwo[0]} attacked ${
                pokemonDataOne[0]
              } for ${attack.toFixed(2)} dmg`,
            ]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          `${pokemonDataTwo[0]} missed ${pokemonDataOne[0]}`,
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
      ? pokemonDataTwo[0]
      : SPEED_1 < SPEED_2 && isActiveArrow === "" && defenderHp <= 0
      ? pokemonDataOne[0]
      : SPEED_1 >= SPEED_2 && isActiveArrow === styles.attack && attackerHp <= 0
      ? pokemonDataTwo[0]
      : SPEED_1 >= SPEED_2 && isActiveArrow === "" && defenderHp <= 0
      ? pokemonDataOne[0]
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

  const battlephase = (
    <div className={styles["battle-phase-container"]}>
      {winningPokemon && menuModal}
      <div className={styles.battleground}>
        <Pokemon
          name={pokemonDataOne[0]}
          image={pokemonDataOne[1]}
          hp={pokemonDataOne[2]}
          attack={pokemonDataOne[3]}
          defense={pokemonDataOne[4]}
          speed={pokemonDataOne[5]}
          hpPercent={hpPercentOne}
          style={healthStyle1}
        />
        <Attack className={isActiveArrow}>
          <Button onClick={attackHandler}>Attack!</Button>
        </Attack>
        <Pokemon
          name={pokemonDataTwo[0]}
          image={pokemonDataTwo[1]}
          hp={pokemonDataTwo[2]}
          attack={pokemonDataTwo[3]}
          defense={pokemonDataTwo[4]}
          speed={pokemonDataTwo[5]}
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
          <Container className={styles.logs}>
            {logs.map((logs) => (
              <p key={Math.random()}>{logs}</p>
            ))}
          </Container>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {homeValue ? (
        <Home>
          <Button onClick={onHomeClickHandler}>New Game</Button>
        </Home>
      ) : (
        battlephase
      )}
    </>
  );
};

export default BattlePhase;
