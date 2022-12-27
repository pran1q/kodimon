import HealthBar from "./HealthBar";
import PokemonData from "./PokemonData";
import Container from "./Container";

import styles from "./Pokemon.module.css";

const Pokemon = ({
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  hpPercent,
  style,
}) => {
  return (
    <div className={styles["pokemon-container"]}>
      <HealthBar
        className={
          hpPercent < 50 && hpPercent >= 30
            ? styles.below50
            : hpPercent < 30 && styles.below30
        }
      >
        <p>{hpPercent} %</p>
        <div className={styles["health-bar"]}>
          <div className={styles["inner-health-bar"]} style={style}></div>
        </div>
      </HealthBar>
      <PokemonData>
        <p>{name}</p>
        <img className={styles["pokemon-image"]} src={image} alt="" />{" "}
        <p className={styles.stats}>Stats</p>
        <Container>
          <ul>
            <li>HP: {hp}</li>
            <li>Attack: {attack}</li>
            <li>Defense: {defense}</li>
            <li>Speed: {speed}</li>
          </ul>
        </Container>
      </PokemonData>
    </div>
  );
};

export default Pokemon;
