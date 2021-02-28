import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/diego3g.png" alt="github" />
      <div>
        <strong>Diego Fernandes</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}

export default Profile;
