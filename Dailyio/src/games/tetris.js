import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './tetris.css';

// Tetromino shapes
const SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
};

const COLORS = [
  '#FF6B6B',  // Red
  '#4ECDC4',  // Teal
  '#45B7D1',  // Blue
  '#96C93D',  // Green
  '#FFD93D',  // Yellow
  '#FF8A5B',  // Orange
  '#6A5ACD'   // Slate Blue
];

const Tetris = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 16 }, () => Array(9).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Memoize piece creation
  const createPiece = useCallback(() => {
    const shapeKeys = Object.keys(SHAPES);
    const randomShape = SHAPES[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]];
    return {
      shape: randomShape,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }, []);

  // Memoize canMove function
  const canMove = useCallback((shape, board, offsetX, offsetY) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = offsetX + x;
          const newY = offsetY + y;

          // Check board boundaries
          if (
            newX < 0 || 
            newX >= 9 || 
            newY >= 16 || 
            (newY >= 0 && board[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  // Memoize lockPiece function
  const lockPiece = useCallback(() => {
    const newBoard = [...board];
    
    // Place current piece on the board
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = currentPosition.y + y;
          const boardX = currentPosition.x + x;
          
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });

    // Clear completed lines
    const clearedBoard = newBoard.reduce((acc, row) => {
      // If line is full, don't add it and increase score
      if (row.every(cell => cell)) {
        setScore(prev => prev + 100);
        return acc;
      }
      return [...acc, row];
    }, []);

    // Add empty rows to top if lines were cleared
    while (clearedBoard.length < 16) {
      clearedBoard.unshift(Array(9).fill(0));
    }

    setBoard(clearedBoard);

    // Create new piece
    const newPiece = createPiece();
    setCurrentPiece(newPiece);
    
    // Check game over condition
    const startX = Math.floor((10 - newPiece.shape[0].length) / 2);
    if (!canMove(newPiece.shape, clearedBoard, startX, 0)) {
      setGameOver(true);
    } else {
      setCurrentPosition({ x: startX, y: 0 });
    }
  }, [board, currentPiece, currentPosition, canMove, createPiece]);

  // Initialize game
  useEffect(() => {
    const newPiece = createPiece();
    setCurrentPiece(newPiece);
    setCurrentPosition({ x: Math.floor((10 - newPiece.shape[0].length) / 2), y: 0 });
  }, [createPiece]);

  // Game loop and piece movement
  useEffect(() => {
    if (gameOver) return;

    const movePieceDown = () => {
      setCurrentPosition(prev => {
        // Check if piece can move down
        if (!canMove(currentPiece.shape, board, prev.x, prev.y + 1)) {
          // Lock piece in place
          lockPiece();
          return prev;
        }
        return { ...prev, y: prev.y + 1 };
      });
    };

    const gameLoop = setInterval(movePieceDown, 500);
    return () => clearInterval(gameLoop);
  }, [currentPiece, gameOver, board, canMove, lockPiece]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          // Move piece left
          if (canMove(currentPiece.shape, board, currentPosition.x - 1, currentPosition.y)) {
            setCurrentPosition(prev => ({ ...prev, x: prev.x - 1 }));
          }
          break;
        case 'ArrowRight':
          // Move piece right
          if (canMove(currentPiece.shape, board, currentPosition.x + 1, currentPosition.y)) {
            setCurrentPosition(prev => ({ ...prev, x: prev.x + 1 }));
          }
          break;
        case 'ArrowDown':
          // Move piece down faster
          if (canMove(currentPiece.shape, board, currentPosition.x, currentPosition.y + 1)) {
            setCurrentPosition(prev => ({ ...prev, y: prev.y + 1 }));
          }
          break;
        case 'ArrowUp':
          // Rotate piece
          const rotatedShape = currentPiece.shape[0].map((val, index) => 
            currentPiece.shape.map(row => row[index]).reverse()
          );
          if (canMove(rotatedShape, board, currentPosition.x, currentPosition.y)) {
            setCurrentPiece(prev => ({ ...prev, shape: rotatedShape }));
          }
          break;
        default:
          // No action for other keys
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPiece, currentPosition, gameOver, board, canMove]);

  // Restart game
  
  const restartGame = () => {
    setBoard(Array.from({ length: 16 }, () => Array(9).fill(0)));
    setGameOver(false);
    setScore(0);
    const newPiece = createPiece();
    setCurrentPiece(newPiece);
    setCurrentPosition({ x: Math.floor((10 - newPiece.shape[0].length) / 2), y: 0 });
  };
  // Render board with current piece
  const renderBoard = useMemo(() => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece && !gameOver) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = currentPosition.y + y;
            const boardX = currentPosition.x + x;
            
            if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });
    }

    return displayBoard;
  }, [board, currentPiece, currentPosition, gameOver]);

  return (
    <div className="tetris-game-container">
      <div className="game-info">
        <div>Score: {score}</div>
        {gameOver && (
          <div className="game-over">
            Game Over! &nbsp;&nbsp;
            <button onClick={restartGame}>Restart</button>
          </div>
        )}
      </div>
      <div className="tetris-board">
        {renderBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, cellIndex) => (
              <div 
                key={cellIndex} 
                className="board-cell"
                style={{ 
                  backgroundColor: cell || 'transparent',
                  border: cell ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tetris;