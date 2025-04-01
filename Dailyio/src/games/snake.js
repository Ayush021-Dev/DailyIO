import React, { useState, useEffect, useCallback } from 'react';

const Snake = () => {
  
  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  
  
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  
  
  const colors = {
    snake: '#7868E6',
    food: '#FF70B0',
    gameOver: '#FFB961',
    text: '#FFFFFF'
  };

  
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * (GRID_SIZE - 1)) + 1,
      y: Math.floor(Math.random() * (GRID_SIZE - 1)) + 1
    };
    
    
    for (const segment of snake) {
      if (segment.x === newFood.x && segment.y === newFood.y) {
        return generateFood();
      }
    }
    
    return newFood;
  }, [snake]);
  
  
  const checkCollision = useCallback((head) => {
    
    if (
      head.x < 0 || 
      head.y < 0 || 
      head.x >= GRID_SIZE || 
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    
    
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    
    return false;
  }, [snake]);
  
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setPaused(!paused);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, gameOver, paused]);
  
  
  useEffect(() => {
    if (gameOver || paused) return;
    
    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };
      
      
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }
      
      
      if (checkCollision(head)) {
        setGameOver(true);
        return;
      }
      
      
      newSnake.unshift(head);
      
      
      if (head.x === food.x && head.y === food.y) {
        setScore(score + 10);
        setFood(generateFood());
        
        
        if (score % 50 === 0 && speed > 50) {
          setSpeed(prevSpeed => prevSpeed - 10);
        }
      } else {
        
        newSnake.pop();
      }
      
      setSnake(newSnake);
    };
    
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [snake, food, direction, gameOver, paused, score, speed, generateFood, checkCollision]);
  
  
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(150);
    setPaused(false);
  };
  
  
  const renderCell = (i, j) => {
    const isSnakeCell = snake.some(segment => segment.x === j && segment.y === i);
    const isFoodCell = food.x === j && food.y === i;
    
    let backgroundColor = 'transparent';
    if (isSnakeCell) backgroundColor = colors.snake;
    if (isFoodCell) backgroundColor = colors.food;
    
    return (
      <div
        key={`${i}-${j}`}
        className="snake-game-cell"
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor
        }}
      />
    );
  };
  
  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        row.push(renderCell(i, j));
      }
      grid.push(
        <div key={i} className="snake-game-row" style={{ display: 'flex' }}>
          {row}
        </div>
      );
    }
    return grid;
  };
  const keyframesStyle = `
    @keyframes dashboardGradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;  
  return (
    <>
      <style>
        {keyframesStyle}
      </style>
      <div className="snake-game-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        padding: '20px',
        background: 'linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D)',
        backgroundSize: '400% 400%',
        animation: 'dashboardGradientBG 15s ease infinite',
      }}>
        <h1 className="snake-game-title" style={{ 
          color: colors.text, 
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Snake Game
        </h1>
        
        <div className="snake-game-score" style={{ 
          color: colors.text, 
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Score: {score}
        </div>
        
        <div className="snake-game-board" style={{ 
          display: 'inline-block',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '2px',
          position: 'relative'
        }}>
          {renderGrid()}
          
          {gameOver && (
            <div className="snake-game-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '4px'
            }}>
              <div className="snake-game-over" style={{ 
                color: colors.gameOver, 
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '15px'
              }}>
                Game Over!
              </div>
              <button 
                className="snake-game-reset-btn" 
                onClick={resetGame}
                style={{
                  backgroundColor: colors.gameOver,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Play Again
              </button>
            </div>
          )}
          
          {paused && !gameOver && (
            <div className="snake-game-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '4px'
            }}>
              <div className="snake-game-paused" style={{ 
                color: colors.text, 
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Paused
              </div>
            </div>
          )}
        </div>
        
        <div className="snake-game-controls" style={{ 
          color: colors.text, 
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          <p>Use arrow keys to move</p>
          <p>Press space to pause/resume</p>
        </div>
      </div>
    </>
  );
};

export default Snake;