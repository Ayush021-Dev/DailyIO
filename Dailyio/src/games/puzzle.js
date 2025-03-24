import React, { useState, useEffect, useCallback } from 'react';

const SlidingPuzzle = () => {
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [size, setSize] = useState(3); // 3x3 grid by default

  // Initialize the board
  const initializeGame = useCallback(() => {
    // Create a solved board first (1 to size*size-1, and 0 for empty)
    const newBoard = Array.from({ length: size * size }, (_, i) => (i + 1) % (size * size));
    
    // Shuffle the board by making random valid moves
    // This ensures the puzzle is always solvable
    let shuffledBoard = [...newBoard];
    let emptyIndex = size * size - 1;
    
    // Make a large number of random moves to shuffle
    for (let i = 0; i < 1000; i++) {
      const possibleMoves = getValidMoves(shuffledBoard, size);
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        // Swap the empty tile with the randomly chosen valid move
        [shuffledBoard[emptyIndex], shuffledBoard[randomMove]] = 
          [shuffledBoard[randomMove], shuffledBoard[emptyIndex]];
        emptyIndex = randomMove;
      }
    }
    
    setBoard(shuffledBoard);
    setMoves(0);
    setGameOver(false);
    setStartTime(Date.now());
    setEndTime(null);
  }, [size]);

  // Get valid moves for the empty tile
  const getValidMoves = (currentBoard, gridSize) => {
    const emptyIndex = currentBoard.indexOf(0);
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;
    const validMoves = [];
    
    // Check up
    if (row > 0) validMoves.push(emptyIndex - gridSize);
    // Check down
    if (row < gridSize - 1) validMoves.push(emptyIndex + gridSize);
    // Check left
    if (col > 0) validMoves.push(emptyIndex - 1);
    // Check right
    if (col < gridSize - 1) validMoves.push(emptyIndex + 1);
    
    return validMoves;
  };
  
  // Check if the game is solved
  const checkWin = useCallback((currentBoard) => {
    // A solved board has numbers 1 to size*size-1 in order, followed by 0
    for (let i = 0; i < currentBoard.length - 1; i++) {
      if (currentBoard[i] !== i + 1) return false;
    }
    return currentBoard[currentBoard.length - 1] === 0;
  }, []);

  // Handle tile click
  const handleTileClick = (index) => {
    if (gameOver) return;
    
    const emptyIndex = board.indexOf(0);
    // Check if the clicked tile is adjacent to the empty space
    const validMoves = getValidMoves(board, size);
    
    if (validMoves.includes(index)) {
      // Create new board with the move applied
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
      
      setBoard(newBoard);
      setMoves(moves + 1);
      
      // Check if the puzzle is solved
      if (checkWin(newBoard)) {
        setGameOver(true);
        setEndTime(Date.now());
      }
    }
  };
  
  // Handle difficulty change
  const changeSize = (newSize) => {
    setSize(newSize);
  };
  
  // Initialize game on mount or when size changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame, size]);

  // Format time for display
  const formatTime = (milliseconds) => {
    if (!milliseconds) return '00:00';
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  // Calculate elapsed time
  const elapsedTime = endTime 
    ? endTime - startTime 
    : startTime 
      ? Date.now() - startTime 
      : 0;

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <h2>Sliding Puzzle</h2>
        <div className="puzzle-stats">
          <span>Moves: {moves}</span>
          <span>Time: {formatTime(elapsedTime)}</span>
        </div>
        <div className="puzzle-controls">
          <button 
            className="puzzle-restart-btn"
            onClick={initializeGame}
          >
            Restart Game
          </button>
          <div className="puzzle-difficulty">
            <button 
              onClick={() => changeSize(3)}
              className={`puzzle-size-btn ${size === 3 ? 'active' : ''}`}
            >
              3×3
            </button>
            <button 
              onClick={() => changeSize(4)}
              className={`puzzle-size-btn ${size === 4 ? 'active' : ''}`}
            >
              4×4
            </button>
            <button 
              onClick={() => changeSize(5)}
              className={`puzzle-size-btn ${size === 5 ? 'active' : ''}`}
            >
              5×5
            </button>
          </div>
        </div>
      </div>
      
      {gameOver && (
        <div className="puzzle-victory">
          <h3>Puzzle Solved!</h3>
          <p>You completed the puzzle in {moves} moves and {formatTime(elapsedTime)}!</p>
        </div>
      )}
      
      <div 
        className="puzzle-grid"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {board.map((value, index) => (
          <div
            key={index}
            className={`puzzle-tile ${value === 0 ? 'empty' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {value !== 0 && value}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .puzzle-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: sans-serif;
        }
        
        .puzzle-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .puzzle-header h2 {
          color: #00c2a8;
          font-size: 28px;
          margin-bottom: 10px;
        }
        
        .puzzle-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
          font-size: 18px;
        }
        
        .puzzle-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .puzzle-difficulty {
          display: flex;
          gap: 10px;
        }
        
        .puzzle-restart-btn {
          background-color: #00c2a8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        .puzzle-restart-btn:hover {
          background-color: #00a892;
        }
        
        .puzzle-size-btn {
          background-color: #e0e0e0;
          color: #333;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .puzzle-size-btn:hover {
          background-color: #d0d0d0;
        }
        
        .puzzle-size-btn.active {
          background-color: #00c2a8;
          color: white;
        }
        
        .puzzle-grid {
          display: grid;
          gap: 6px;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          aspect-ratio: 1/1;
        }
        
        .puzzle-tile {
          background: linear-gradient(135deg, #2ce5ca, #00c2a8);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        
        .puzzle-tile:hover:not(.empty) {
          transform: scale(0.95);
        }
        
        .puzzle-tile.empty {
          background: none;
          box-shadow: none;
          cursor: default;
        }
        
        .puzzle-victory {
          background-color: rgba(0, 194, 168, 0.1);
          border: 2px solid #00c2a8;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .puzzle-victory h3 {
          color: #00c2a8;
          margin-top: 0;
        }
        
        /* Responsive design */
        @media (max-width: 600px) {
          .puzzle-tile {
            font-size: 18px;
          }
        }
        
        @media (max-width: 400px) {
          .puzzle-tile {
            font-size: 16px;
          }
          
          .puzzle-controls {
            flex-direction: column;
            gap: 10px;
          }
          
          .puzzle-difficulty {
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SlidingPuzzle;