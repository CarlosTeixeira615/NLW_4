import { useContext } from "react";
import { CountDownContext } from "../context/CountDownContext";
import styles from "../styles/components/CounterDown.module.css";

function CounterDown() {
  const {
    hasFinish,
    isActive,
    minutes,
    resetCountDown,
    seconds,
    startCountdown,
  } = useContext(CountDownContext);

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRigth] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.CounterDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRigth}</span>
        </div>
      </div>
      {hasFinish ? (
        <button disabled className={`${styles.startCountdownButton}`}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              onClick={resetCountDown}
              className={`${styles.startCountdownButton} ${styles.startCountdowActive}`}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              onClick={startCountdown}
              className={styles.startCountdownButton}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default CounterDown;
