import React, { useState, useEffect, useCallback } from 'react';
import "./memory.css";
const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Define initializeGame with useCallback and move cardIcons inside
  const initializeGame = useCallback(() => {
    // Define card icons inside the callback to avoid dependency issues
    const cardIcons = [
      '🍎', '🍌', '🍒', '🍓', '🍋', '🍉', '🍇', '🍊',
      '🥝', '🍍', '🥭', '🍑'
    ];

    // Create pairs of cards
    const cardPairs = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false
      }));

    setCards(cardPairs);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameOver(false);
    setStartTime(Date.now());
    setEndTime(null);
  }, []);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle card click
  const handleCardClick = (id) => {
    // Ignore click if game is over or card is already flipped/matched
    if (
      gameOver ||
      flippedCards.length >= 2 ||
      flippedCards.includes(id) ||
      matchedCards.includes(id)
    ) {
      return;
    }

    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard.icon === secondCard.icon) {
        // If cards match, add them to matched cards
        const newMatchedCards = [...matchedCards, firstCardId, secondCardId];
        setMatchedCards(newMatchedCards);
        setFlippedCards([]);

        // Check if all cards are matched
        if (newMatchedCards.length === cards.length) {
          setGameOver(true);
          setEndTime(Date.now());
        }
      } else {
        // If cards don't match, flip them back after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

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
    <div className="memory-match-page">
      <div className="memory-match-container">
        <div className="memory-match-header"> <br></br><br></br>
          <h2>Memory Match</h2>
          <div className="memory-match-stats">
            <div className="blah">
              <span>Moves: {moves}</span>
              <span><button className="memory-match-restart-btn" onClick={initializeGame}>Restart Game</button></span>
              <span>Time: {formatTime(elapsedTime)}</span>
            </div>
          </div></div>

        {gameOver && (
          <div className="memory-match-victory">
            <h3>Congratulations!</h3>
            <p>You completed the game in {moves} moves and {formatTime(elapsedTime)}!</p>
          </div>
        )}

        <div className="memory-match-grid">
          {cards.map(card => (
            <div
              key={card.id}
              className={`memory-card ${flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'flipped' : ''
                } ${matchedCards.includes(card.id) ? 'matched' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front"></div>
                <div className="memory-card-back">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryMatch;