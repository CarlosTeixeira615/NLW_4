import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import { CountDownContext } from "../context/CountDownContext";
import styles from "../styles/components/ChallendBox.module.css";

function ChallendBox() {
  const { activeChallenges, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );

  const { resetCountDown } = useContext(CountDownContext);

  function handleChallengeSucceded() {
    completeChallenge();
    resetCountDown();
  }

  function handleChallengeFailed() {
    resetCountDown();
    resetChallenge();
  }

  return (
    <div className={styles.ChallendBoxContainer}>
      {activeChallenges ? (
        <div className={styles.ChallendActive}>
          <header>Ganhe {activeChallenges.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenges.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenges.description}</p>
          </main>
          <footer>
            <button
              type="button"
              onClick={handleChallengeFailed}
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type="button"
              onClick={handleChallengeSucceded}
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challendNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
}

export default ChallendBox;
