import React, { useState, useEffect, useRef } from 'react';
import './whack.css';

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeMole, setActiveMole] = useState(null);
  const [gameSpeed, setGameSpeed] = useState(1000);
  const timerRef = useRef(null);
  const moleTimerRef = useRef(null);

  // Mole positions (9 holes in a 3x3 grid)
  const molePositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
    showRandomMole();
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // End the game
  const endGame = () => {
    setGameStarted(false);
    setActiveMole(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleTimerRef.current) clearInterval(moleTimerRef.current);
  };

  // Show a random mole
  const showRandomMole = () => {
    if (moleTimerRef.current) clearInterval(moleTimerRef.current);
    
    moleTimerRef.current = setInterval(() => {
      const randomPosition = Math.floor(Math.random() * molePositions.length);
      setActiveMole(randomPosition);
      
      // Set a timeout to hide the mole after a random time
      setTimeout(() => {
        setActiveMole(null);
      }, gameSpeed * 0.8);
    }, gameSpeed);
  };

  // Whack a mole
  const whackMole = (position) => {
    if (position === activeMole) {
      setScore(prevScore => prevScore + 1);
      setActiveMole(null);
      
      // Speed up the game slightly as score increases
      if (score > 0 && score % 5 === 0) {
        setGameSpeed(prevSpeed => Math.max(prevSpeed - 50, 600));
      }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (moleTimerRef.current) clearInterval(moleTimerRef.current);
    };
  }, []);

  return (
    <div className="wam-animated-bg">
      <div className="wam-container">
        <h2 className="wam-title">Whack-a-Mole</h2>
        
        <div className="wam-stats">
          <div className="wam-score">Score: {score}</div>
          <div className="wam-timer">Time: {timeLeft}s</div>
        </div>
        
        {!gameStarted ? (
          <div className="wam-start-screen">
            <p className="wam-instructions">
              Click on the moles as they appear to score points!
            </p>
            <button className="wam-start-button" onClick={startGame}>
              Start Game
            </button>
          </div>
        ) : (
          <div className="wam-game-board">
            {molePositions.map((position) => (
              <div 
                key={position} 
                className={`wam-hole ${activeMole === position ? 'wam-active' : ''}`}
                onClick={() => whackMole(position)}
              >
                <div className="wam-mole"></div>
              </div>
            ))}
          </div>
        )}
        
        {!gameStarted && timeLeft === 0 && (
          <div className="wam-game-over">
            <h3 className="wam-game-over-title">Game Over!</h3>
            <p className="wam-final-score">Final Score: {score}</p>
            <button className="wam-play-again-button" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhackAMole;