import styles from "./PokemonData.module.css";

const PokemonData = ({ children }) => {
  return <div className={styles["pokemon-data-container"]}>{children}</div>;
};

export default PokemonData;
