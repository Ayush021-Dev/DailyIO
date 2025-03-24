import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./games.css"; // Import the Games CSS file
import BrickBreaker from "./games/brick"; // Import the BrickBreaker component
import WhackAMole from './games/whack';
import Snake from './games/snake';
import Game2048 from './games/2048';
import FlappyBird from './games/flappy';
import MemoryMatch from './games/memory';
import SlidingPuzzle from "./games/puzzle";
import PingPong from "./games/pingpong";
// Then use it in your component or routes
const GamesHome = () => {
  // Array of game objects
  const games = [
    { id: 1, name: "Brick Breaker", description: "Break all the bricks!", path: "/games/brick" },
    { id: 2, name: "Memory Match", description: "Test your memory skills", path: "/games/memory" },
    { id: 3, name: "Snake Game", description: "Classic snake challenge", path: "/games/snake" },
    { id: 4, name: "Whack-A-Mole", description: "Whack moles as fast as you can", path: "/games/whack" },
    { id: 5, name: "Flappy Bird", description: "Flap Flap between the pipes", path: "/games/flappy" },
    { id: 6, name: "2048", description: "Combine tiles to reach 2048", path: "/games/2048" },
    { id: 7, name: "Puzzle", description: "Slide the blocks in minimum moves", path: "/games/puzzle" },
    { id: 8, name: "Ping Pong", description: "2D Table tennis", path: "/games/pingpong" },
  ];

  return (
    <div className="games-page">
      <div className="games-container">
        <div className="games-content">
          <h1 className="games-header">Mini Games</h1>

          <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <Link to={game.path || `/games/${game.id}`}>
                  <h3>{game.name}</h3>
                  <p>{game.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Games = () => {
  return (
    <Routes>
      <Route path="/" element={<GamesHome />} />
      <Route path="/games/brick" element={<BrickBreaker />} />
      <Route path="/games/whack" element={<WhackAMole />} />
      <Route path="/games/snake" element={<Snake />} />
      <Route path="/games/2048" element={<Game2048 />} />
      <Route path="/games/flappy" element={<FlappyBird />} />
      <Route path="/games/memory" element={<MemoryMatch />} />
      <Route path="/games/puzzle" element={<SlidingPuzzle />} />
      <Route path="/games/pingpong" element={<PingPong />} />
      {/* Add routes for other games as you develop them */}
    </Routes>
  );
};

export default Games;