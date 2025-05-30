import React from 'react';
import '../styles/Cover.css';

const Cover = ({ onStart }) => {
  return (
    <div className="cover-container">
      <img
        src="/assets/cover/start.png"
        alt="Start Game"
        onClick={onStart}
        className="start-button"
      />
    </div>
  );
};

export default Cover;