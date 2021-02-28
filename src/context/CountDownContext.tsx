import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountDown: () => void;
}

interface CountDowsProviderProps {
  children: ReactNode;
}

export const CountDownContext = createContext({} as CountdownContextData);
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountDowsProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setisActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setisActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setisActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setTime(25 * 60);
    setisActive(false);
    setHasFinish(false);
  }
  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinish,
        isActive,
        startCountdown,
        resetCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
