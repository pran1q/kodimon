import Container from "./UI/Container";

import styles from "./Logs.module.css";

const Logs = ({ children }) => {
  return <Container className={styles.logs}>{children}</Container>;
};

export default Logs;
