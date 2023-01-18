import { useLayoutEffect, useRef } from "react";
import Container from "../UI/Container";
import styles from "./Logs.module.css";

const Logs = ({ logs }) => {
  const logsRef = useRef(null);

  useLayoutEffect(() => {
    logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  return (
    <Container className={`${styles.logs} ${styles.container}`}>
      <div className={styles["logs-wrapper"]} ref={logsRef}>
        {" "}
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </Container>
  );
};
export default Logs;
