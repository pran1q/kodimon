import Container from "../UI/Container";
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
  const healthBarColor =
    hpPercent < 50 && hpPercent >= 30
      ? styles.below50
      : hpPercent < 30 && styles.below30;

  const healthBar = (
    <div
      className={`${styles["health-bar-container"]}
          ${healthBarColor}
        `}
    >
      <p>{hpPercent} %</p>
      <div className={styles["health-bar"]}>
        <div className={styles["inner-health-bar"]} style={style}></div>
      </div>
    </div>
  );

  const stats = (
    <ul>
      <li>HP: {hp}</li>
      <li>Attack: {attack}</li>
      <li>Defense: {defense}</li>
      <li>Speed: {speed}</li>
    </ul>
  );

  return (
    <div className={styles["pokemon-container"]}>
      {healthBar}
      <div className={styles["pokemon-data-container"]}>
        <p>{name}</p>
        <img className={styles["pokemon-image"]} src={image} alt="" />{" "}
        <p className={styles.stats}>Stats</p>
        <Container>{stats}</Container>
      </div>
    </div>
  );
};

export default Pokemon;
