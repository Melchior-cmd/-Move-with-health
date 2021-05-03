import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  active: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const {startNewChallenge } = useContext(challengesContext);


  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setActive(true);
  }

  function resetCountdown(){
    clearTimeout(countdownTimout);
    setActive(false);
    setTime(0.1 * 60)
    setHasFinished(false);
  }

  useEffect(() =>{
    if (active && time > 0){
      countdownTimout = setTimeout(() =>{
        setTime(time - 1);
      }, 1000)
    }else if (active && time === 0){
      setHasFinished(true);
      setActive(false);
      startNewChallenge();
    }
  }, [active, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      active,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}