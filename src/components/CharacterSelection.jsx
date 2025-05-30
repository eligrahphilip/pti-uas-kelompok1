import React, { useState } from 'react';
import '../styles/CharacterSelection.css';

const CharacterSelection = ({ onSelect }) => {
  const [selectedCharacter, setSelectedCharacter] = useState('Warrior');
  const [playerName, setPlayerName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const characters = [
    {
      name: 'Warrior',
      src: '/assets/avatar/avatar1.png',
      borderColor: 'border-black',
      description: 'A mighty warrior with exceptional strength and combat skills',
      stats: { strength: 9, agility: 5, intelligence: 3 }
    },
    {
      name: 'Mage',
      src: '/assets/avatar/avatar2.png',
      borderColor: 'border-black',
      description: 'A wise mage with powerful magical abilities',
      stats: { strength: 2, agility: 4, intelligence: 10 }
    },
    {
      name: 'Archer',
      src: '/assets/avatar/avatar3.png',
      borderColor: 'border-black',
      description: 'A skilled archer with unmatched precision',
      stats: { strength: 4, agility: 9, intelligence: 5 }
    },
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % characters.length;
    setCurrentIndex(nextIndex);
    setSelectedCharacter(characters[nextIndex].name);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
    setCurrentIndex(prevIndex);
    setSelectedCharacter(characters[prevIndex].name);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleStart = () => {
    if (onSelect && selectedCharacter && playerName.trim()) {
      onSelect({ character: selectedCharacter, name: playerName });
    }
  };

  return (
    <div className="character-selection-container">
      <div className="floating-particles"></div>
      <div className="character-selection-content">
        <h1 className="title">Choose Your Avatar</h1>
        <div className="character-display">
          <button onClick={handlePrev} className="nav-button prev-button"></button>
          <div className={`character-info ${isAnimating ? 'animating' : ''}`}>
            <div className="character-image-container">
              <img
                src={characters[currentIndex].src}
                alt={characters[currentIndex].name}
                className="character-image"
              />
              <div className="character-name">{characters[currentIndex].name}</div>
            </div>
            <div className="character-stats">
              <p className="description">{characters[currentIndex].description}</p>
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-value">{characters[currentIndex].stats.strength}</div>
                  <div className="stat-label">STRENGTH</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{characters[currentIndex].stats.agility}</div>
                  <div className="stat-label">AGILITY</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{characters[currentIndex].stats.intelligence}</div>
                  <div className="stat-label">INTELLECT</div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleNext} className="nav-button next-button"></button>
        </div>
        <div className="player-name-input">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your hero's name"
            className="name-input"
          />
        </div>
        <button
          onClick={handleStart}
          disabled={!selectedCharacter || !playerName.trim()}
          className="start-button"
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};

export default CharacterSelection;