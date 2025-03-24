import React, { useState, useEffect, useRef, useCallback } from 'react';

const FlappyBirdGame = () => {
  // Game constants
  const GRAVITY = 0.6;
  const JUMP_FORCE = -10;
  const PIPE_WIDTH = 80;
  const PIPE_GAP = 150;
  const PIPE_SPEED = 3;
  const PIPE_SPAWN_RATE = 1500; // ms
  const BIRD_WIDTH = 40;
  const BIRD_HEIGHT = 30;
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  
  // Refs for animation frame and intervals
  const flappyGameLoopRef = useRef(null);
  const flappyPipeIntervalRef = useRef(null);
  const flappyCanvasRef = useRef(null);
  
  // Game dimensions
  const gameWidth = 400;
  const gameHeight = 500;
  
  // Check for collisions
  const checkFlappyCollisions = useCallback((pipes) => {
    // Check if bird hits the ground or ceiling
    if (birdPosition <= 0 || birdPosition >= gameHeight - BIRD_HEIGHT) {
      return true;
    }
    
    // Check if bird hits any pipe
    for (const pipe of pipes) {
      if (
        BIRD_WIDTH > pipe.x && 
        0 < pipe.x + PIPE_WIDTH &&
        (birdPosition < pipe.topHeight || birdPosition + BIRD_HEIGHT > pipe.bottomY)
      ) {
        return true;
      }
    }
    
    return false;
  }, [birdPosition]);
  
  // Handle game over
  const handleFlappyGameOver = useCallback(() => {
    setGameOver(true);
    
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('flappyBirdUniqueGameBestScore', score);
    }
    
    if (flappyPipeIntervalRef.current) {
      clearInterval(flappyPipeIntervalRef.current);
    }
    
    if (flappyGameLoopRef.current) {
      cancelAnimationFrame(flappyGameLoopRef.current);
    }
  }, [score, bestScore]);
  
  // Render game to canvas
  const renderFlappyGame = useCallback(() => {
    const canvas = flappyCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    
    // Draw background
    ctx.fillStyle = '#4ec5d4'; // Turquoise background
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    
    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 5; i++) {
      const cloudX = (i * 100 + (Date.now() / 100) % 500) % gameWidth;
      const cloudY = 50 + (i * 30) % 100;
      
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 20, 0, Math.PI * 2);
      ctx.arc(cloudX + 15, cloudY - 10, 15, 0, Math.PI * 2);
      ctx.arc(cloudX + 25, cloudY, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw bird
    ctx.fillStyle = '#ff9f67'; // Orange bird
    ctx.beginPath();
    ctx.ellipse(BIRD_WIDTH / 2, birdPosition + BIRD_HEIGHT / 2, BIRD_WIDTH / 2, BIRD_HEIGHT / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bird eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(BIRD_WIDTH / 2 + 10, birdPosition + BIRD_HEIGHT / 2 - 5, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(BIRD_WIDTH / 2 + 12, birdPosition + BIRD_HEIGHT / 2 - 5, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw bird wing
    ctx.fillStyle = '#e88b55';
    ctx.beginPath();
    ctx.ellipse(
      BIRD_WIDTH / 2 - 5, 
      birdPosition + BIRD_HEIGHT / 2 + 5 + Math.sin(Date.now() / 100) * 3, 
      10, 5, 
      Math.PI / 4, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Draw bird beak
    ctx.fillStyle = '#ffdd00';
    ctx.beginPath();
    ctx.moveTo(BIRD_WIDTH / 2 + 15, birdPosition + BIRD_HEIGHT / 2);
    ctx.lineTo(BIRD_WIDTH / 2 + 25, birdPosition + BIRD_HEIGHT / 2 - 5);
    ctx.lineTo(BIRD_WIDTH / 2 + 25, birdPosition + BIRD_HEIGHT / 2 + 5);
    ctx.fill();
    
    // Draw pipes
    ctx.fillStyle = '#2ecc71'; // Green pipes
    pipes.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
      
      // Top pipe cap
      ctx.fillStyle = '#27ae60';
      ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20);
      ctx.fillStyle = '#2ecc71';
      
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.bottomY, PIPE_WIDTH, gameHeight - pipe.bottomY);
      
      // Bottom pipe cap
      ctx.fillStyle = '#27ae60';
      ctx.fillRect(pipe.x - 5, pipe.bottomY, PIPE_WIDTH + 10, 20);
      ctx.fillStyle = '#2ecc71';
    });
    
    // Draw ground
    ctx.fillStyle = '#3a9583';
    ctx.fillRect(0, gameHeight - 20, gameWidth, 20);
    
    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(score.toString(), gameWidth / 2, 60);
  }, [birdPosition, pipes, score]);
  
  // Generate new pipe
  const generateFlappyPipe = useCallback(() => {
    if (!gameStarted || gameOver) return;
    
    const height = Math.floor(Math.random() * (gameHeight - PIPE_GAP - 100)) + 50;
    
    setPipes(prevPipes => [
      ...prevPipes,
      {
        x: gameWidth,
        topHeight: height,
        bottomY: height + PIPE_GAP,
        passed: false
      }
    ]);
  }, [gameStarted, gameOver, gameHeight]);
  
  // Game loop - needs to reference multiple functions, so declare after them
  const flappyGameLoop = useCallback(() => {
    // Update bird position
    if (!gameOver) {
      setBirdPosition(pos => pos + birdVelocity);
      setBirdVelocity(vel => vel + GRAVITY);
    }
    
    // Update pipe positions
    setPipes(prevPipes => {
      const updatedPipes = prevPipes.map(pipe => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED
      })).filter(pipe => pipe.x + PIPE_WIDTH > 0);
      
      // Check for collisions
      if (checkFlappyCollisions(updatedPipes)) {
        handleFlappyGameOver();
        return prevPipes;
      }
      
      // Check for score
      const scoringPipe = updatedPipes.find(pipe => !pipe.passed && pipe.x + PIPE_WIDTH < BIRD_WIDTH);
      if (scoringPipe) {
        setScore(prevScore => prevScore + 1);
        scoringPipe.passed = true;
      }
      
      return updatedPipes;
    });
    
    // Render game
    renderFlappyGame();
    
    // Continue loop
    if (!gameOver) {
      flappyGameLoopRef.current = requestAnimationFrame(flappyGameLoop);
    }
  }, [gameOver, birdVelocity, checkFlappyCollisions, handleFlappyGameOver, renderFlappyGame]);
  
  // Initialize game - define after game loop since it references it
  const startFlappyGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setBirdPosition(250);
    setBirdVelocity(0);
    setPipes([]);
    
    // Start game loop
    if (flappyGameLoopRef.current) cancelAnimationFrame(flappyGameLoopRef.current);
    flappyGameLoop();
    
    // Start generating pipes
    if (flappyPipeIntervalRef.current) clearInterval(flappyPipeIntervalRef.current);
    flappyPipeIntervalRef.current = setInterval(generateFlappyPipe, PIPE_SPAWN_RATE);
  }, [flappyGameLoop, generateFlappyPipe]);
  
  // Handle jump - define after startFlappyGame since it references it
  const flappyJump = useCallback(() => {
    if (gameOver) return;
    
    if (!gameStarted) {
      startFlappyGame();
    } else {
      setBirdVelocity(JUMP_FORCE);
    }
  }, [gameOver, gameStarted, startFlappyGame, JUMP_FORCE]);
  
  // Handle keyboard and mouse events
  useEffect(() => {
    const handleFlappyKeyDown = (e) => {
      if (e.code === 'Space') {
        flappyJump();
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleFlappyKeyDown);
    
    // Load best score from localStorage
    const storedBestScore = localStorage.getItem('flappyBirdUniqueGameBestScore');
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore));
    }
    
    return () => {
      window.removeEventListener('keydown', handleFlappyKeyDown);
      if (flappyGameLoopRef.current) cancelAnimationFrame(flappyGameLoopRef.current);
      if (flappyPipeIntervalRef.current) clearInterval(flappyPipeIntervalRef.current);
    };
  }, [flappyJump]);
  
  // Styles with animated background added
  const flappyStyles = {
    animatedBackground: {
      backgroundSize: '400% 400%',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D)',
      animation: 'flappyGradientBG 15s ease infinite',
      padding: '20px'
    },
    gameContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'rgba(78, 197, 212, 0.9)', // Semi-transparent turquoise background
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      color: 'white'
    },
    header: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      color: 'white'
    },
    canvas: {
      border: '3px solid white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      touchAction: 'none' // Prevents scrolling on mobile
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: gameWidth,
      marginBottom: '20px'
    },
    statBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '10px 20px',
      borderRadius: '10px',
      minWidth: '120px',
      textAlign: 'center'
    },
    statTitle: {
      fontSize: '1rem',
      marginBottom: '5px'
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#ff9f67', // Orange button
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderRadius: '30px',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.1s, background-color 0.3s',
      margin: '10px 0',
      outline: 'none'
    },
    buttonHover: {
      backgroundColor: '#e88b55',
      transform: 'scale(1.05)'
    },
    overlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      zIndex: '10'
    },
    instructions: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      textAlign: 'center',
      fontSize: '1.1rem',
      maxWidth: '300px'
    },
    messageText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'white',
      textAlign: 'center'
    }
  };
  
  // Add the CSS keyframes for the animated background
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flappyGradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div style={flappyStyles.animatedBackground} className="flappy-bird-v2-animated-bg">
      <div style={flappyStyles.gameContainer} className="flappy-bird-v2-main-container">
        <h1 style={flappyStyles.header}>Flappy Bird</h1>
        
        <div style={flappyStyles.statsContainer} className="flappy-bird-v2-stats-container">
          <div style={flappyStyles.statBox} className="flappy-bird-v2-score-box">
            <div style={flappyStyles.statTitle}>SCORE</div>
            <div style={flappyStyles.statValue}>{score}</div>
          </div>
          <div style={flappyStyles.statBox} className="flappy-bird-v2-best-score-box">
            <div style={flappyStyles.statTitle}>BEST</div>
            <div style={flappyStyles.statValue}>{bestScore}</div>
          </div>
        </div>
        
        <div style={{ position: 'relative' }} className="flappy-bird-v2-canvas-wrapper">
          <canvas
            ref={flappyCanvasRef}
            width={gameWidth}
            height={gameHeight}
            style={flappyStyles.canvas}
            onClick={flappyJump}
            onTouchStart={flappyJump}
            className="flappy-bird-v2-game-canvas"
          />
          
          {!gameStarted && !gameOver && (
            <div style={flappyStyles.overlay} className="flappy-bird-v2-start-screen">
              <div style={flappyStyles.instructions} className="flappy-bird-v2-instructions">
                Tap or press SPACE to make the bird fly. Avoid the pipes!
              </div>
              <button 
                style={flappyStyles.button} 
                onClick={startFlappyGame}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = flappyStyles.buttonHover.backgroundColor;
                  e.currentTarget.style.transform = flappyStyles.buttonHover.transform;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = flappyStyles.button.backgroundColor;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                className="flappy-bird-v2-start-button"
              >
                Start Game
              </button>
            </div>
          )}
          
          {gameOver && (
            <div style={flappyStyles.overlay} className="flappy-bird-v2-game-over-screen">
              <div style={flappyStyles.messageText} className="flappy-bird-v2-game-over-text">Game Over!</div>
              <div style={flappyStyles.statBox} className="flappy-bird-v2-final-score">
                <div style={flappyStyles.statTitle}>SCORE</div>
                <div style={flappyStyles.statValue}>{score}</div>
              </div>
              <button 
                style={{...flappyStyles.button, marginTop: '20px'}} 
                onClick={startFlappyGame}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = flappyStyles.buttonHover.backgroundColor;
                  e.currentTarget.style.transform = flappyStyles.buttonHover.transform;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = flappyStyles.button.backgroundColor;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                className="flappy-bird-v2-restart-button"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
        
        <div style={{ fontSize: '0.9rem', marginTop: '10px', textAlign: 'center' }} className="flappy-bird-v2-controls-hint">
          Click/Tap or press SPACE to flap
        </div>
      </div>
    </div>
  );
};

export default FlappyBirdGame;