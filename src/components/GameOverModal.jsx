import React from 'react';
import '../styles/GameOverModal.css';

const GameOverModal = ({ score, onRestart }) => {
  return (
    <div className="game-over-modal">
      <div className="modal-content">
        <img src="/assets/game-over.gif" alt="Game Over" className="game-over-image" />
        <h2>Game Over!</h2>
        <p>Your Score: {score}</p>
        <button onClick={onRestart} className="restart-button">
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;