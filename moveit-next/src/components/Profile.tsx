import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(challengesContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https:github.com/melchior-cmd.png" alt="Lucas Peres Melchior"/>
      <div>
        <strong>Lucas Peres Melchior</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}