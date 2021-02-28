import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallendsContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenges: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallendsProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallendsContextData);

export function ChallengesProvider({
  children,
  ...res
}: ChallendsProviderProps) {
  const [level, setLevel] = useState(res.level ?? 1);
  const [currentExperience, SetCurrentExperience] = useState(
    res.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    res.challengesCompleted ?? 0
  );
  const [activeChallenges, setActiveChallenges] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    setActiveChallenges(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎇", {
        body: `Valendo ${challenge.amount} Xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenges(null);
  }

  function completeChallenge() {
    if (!activeChallenges) {
      return;
    }
    const { amount } = activeChallenges;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    SetCurrentExperience(finalExperience);
    setActiveChallenges(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenges,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {isLevelUpModalOpen && <LevelUpModal />}
      {children}
    </ChallengesContext.Provider>
  );
}
