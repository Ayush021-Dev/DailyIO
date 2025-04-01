import React, { useEffect, useRef, useState } from 'react';
import "./brick.css";
const BrickBreaker = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  const gameStartedRef = useRef(gameStarted);
  const scoreRef = useRef(score);
  const livesRef = useRef(lives);
  const gameOverRef = useRef(gameOver);
  const gameWonRef = useRef(gameWon);
  
  useEffect(() => {
    gameStartedRef.current = gameStarted;
    scoreRef.current = score;
    livesRef.current = lives;
    gameOverRef.current = gameOver;
    gameWonRef.current = gameWon;
  }, [gameStarted, score, lives, gameOver, gameWon]);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent', 
      padding: '20px',
      borderRadius: '12px',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    },
  
    title: {
      color: '#FFFFFF',
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    canvasContainer: {
      position: 'relative',
      border: '3px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#222',
    },
    canvas: {
      display: 'block',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
    },
    instructions: {
      color: '#FFFFFF',
      fontSize: '16px',
      textAlign: 'center',
      marginTop: '15px',
      maxWidth: '600px',
      lineHeight: '1.5',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 5;
    let dy = -5;
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 5;
    let brickColumnCount = 9;
    let brickWidth = 60;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    
    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        let colors = ['#7868E6', '#FF70B0', '#55D6D2', '#FFB961', '#80E6C7'];
        bricks[c][r] = { x: 0, y: 0, status: 1, color: colors[r] };
      }
    }
    
    const keyDownHandler = (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
      }
    };
    
    const keyUpHandler = (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
      }
    };
    
    const mouseMoveHandler = (e) => {
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    };
    
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    
    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFB961'; 
      ctx.fill();
      ctx.closePath();
    };
    
    const drawPaddle = () => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 5);
      } else {
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      }
      ctx.fillStyle = '#7868E6'; 
      ctx.fill();
      ctx.closePath();
    };
    
    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 3);
            } else {
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
            }
            ctx.fillStyle = bricks[c][r].color;
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    };
    
    const drawScore = () => {
      ctx.font = '16px Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Score: ${scoreRef.current}`,60,20);
    };
    
    const drawLives = () => {
      ctx.font = '16px Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Lives: ${livesRef.current}`, canvas.width - 80, 20);
    };

    const countActiveBricks = () => {
      let count = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            count++;
          }
        }
      }
      return count;
    };
    
    
    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          if (b.status === 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
              
              
              const newScore = scoreRef.current + 1;
              setScore(newScore);
              
              
              const remainingBricks = countActiveBricks();
              if (remainingBricks === 0) {
                setGameWon(true);
                setGameStarted(false);
              }
            }
          }
        }
      }
    };
    
    
    const draw = () => {
      
      if (!gameStartedRef.current || gameOverRef.current || gameWonRef.current) {
        return;
      }
      
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();
      
      
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          
          dy = -dy;
          
          const hitPosition = (x - paddleX) / paddleWidth; 
          dx = 8 * (hitPosition - 0.5); 
        } else {
          
          const newLives = livesRef.current - 1;
          setLives(newLives);
          
          if (newLives <= 0) {
            setGameOver(true);
            setGameStarted(false);
            return;
          } else {
            
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 5;
            dy = -5;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }
      
      
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      
      
      x += dx;
      y += dy;
      
      
      if (gameStartedRef.current && !gameOverRef.current && !gameWonRef.current) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };
    
    
    const updateGameScreen = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (gameStartedRef.current && !gameOverRef.current && !gameWonRef.current) {
        
        animationFrameId = requestAnimationFrame(draw);
      } else {
        
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        
        
        ctx.textAlign = 'center';
        
        if (gameOverRef.current) {
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.font = '24px Arial, sans-serif';
          ctx.fillStyle = '#FF70B0'; 
          ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(`Final Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2);
          ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2 + 30);
        } else if (gameWonRef.current) {
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.font = '24px Arial, sans-serif';
          ctx.fillStyle = '#7868E6'; 
          ctx.fillText('Congratulations! You Won!', canvas.width / 2, canvas.height / 2 - 30);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(`Final Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2);
          ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2 + 30);
        } else {
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(0, canvas.height / 2 - 50, canvas.width, 100);
          
          ctx.font = '24px Arial, sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
          ctx.font = '16px Arial, sans-serif';
          ctx.fillText('Use arrow keys or mouse to move the paddle', canvas.width / 2, canvas.height / 2 + 30);
        }
      }
    };
    
    
    const handleCanvasClick = () => {
      if (!gameStartedRef.current) {
        if (gameOverRef.current || gameWonRef.current) {
          
          setScore(0);
          setLives(3);
          setGameOver(false);
          setGameWon(false);
          
          
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              bricks[c][r].status = 1;
            }
          }
          
          
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 5;
          dy = -5;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
        
        
        setGameStarted(true);
      }
    };
    
    
    canvas.addEventListener('click', handleCanvasClick);
    
    
    updateGameScreen();
    
    
    const gameStateChangeEffect = () => {
      if (gameStartedRef.current && !gameOverRef.current && !gameWonRef.current) {
        
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(draw);
      } else {
        
        cancelAnimationFrame(animationFrameId);
        updateGameScreen();
      }
    };
    
    
    const gameStateInterval = setInterval(gameStateChangeEffect, 100);
    
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(gameStateInterval);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);
  
  return (
    <div className="brick-breaker-page"> 
    <br></br><br></br>
    <div style={styles.container} className="brick-breaker-container">
      <h2 style={styles.title} className="brick-breaker-title">Brick Breaker</h2>
      <div style={styles.canvasContainer} className="brick-breaker-canvas-container">
        <canvas 
          ref={canvasRef} 
          width={700} 
          height={400} 
          style={styles.canvas}
          className="brick-breaker-canvas"
        /><br></br>
      </div><br></br>
      <div style={styles.instructions} className="brick-breaker-instructions">
        <p>Use your mouse or arrow keys to move the paddle.</p>
        <p>Don't let the ball fall below the paddle or you'll lose a life.</p>
      </div>
    </div>
    </div>
  );
};

export default BrickBreaker;