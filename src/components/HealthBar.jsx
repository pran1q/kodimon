import styles from "./HealthBar.module.css";

const Healthbar = ({ className, children }) => {
  return (
    <div className={`${styles["health-bar-container"]} ${className}`}>
      {children}
    </div>
  );
};

export default Healthbar;
