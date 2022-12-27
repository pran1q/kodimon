import arrow from "../images/arrow.svg";

import styles from "./Attack.module.css";

import Button from "./Button";

const Attack = ({ className, children }) => {
  return (
    <div className={styles["attack-container"]}>
      <img className={`${styles.arrow} ${className}`} src={arrow} alt="" />
      {children}
    </div>
  );
};

export default Attack;
