import Container from "../UI/Container";
import styles from "./Menu.module.css";

const Menu = ({ className, children }) => {
  return (
    <div className={`${styles["menu-container"]} ${className}`}>
      <p>Menu</p>
      <Container className={styles.container}>{children}</Container>
    </div>
  );
};

export default Menu;
