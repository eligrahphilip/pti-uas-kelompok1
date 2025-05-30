import React from 'react';
import '../styles/NavigationButton.css';

const NavigationButton = ({
  handleArrowPress,
  setKeys,
  toggleMenu,
  returnToWorld,
  exitMap,
  isWorldView,
  isInteriorView,
}) => {
  const handlePress = (direction) => {
    handleArrowPress(direction);
  };

  return (
    <>
      {/* Tombol navigasi utama (Menu, Return, Exit) */}
      {(isWorldView || isInteriorView) && (
        <div className="navigation-buttons">
          {isWorldView && (
            <button
              className="nav-button menu-button"
              onClick={toggleMenu}
              title="Menu (M)"
            >
              <i className="fas fa-bars"></i> Menu
            </button>
          )}
          {isInteriorView && (
            <>
              <button
                className="nav-button return-button"
                onClick={returnToWorld}
                title="Return to World (R)"
              >
                <i className="fas fa-globe"></i> World
              </button>
              <button
                className="nav-button exit-button"
                onClick={exitMap}
                title="Exit (Esc)"
              >
                <i className="fas fa-door-open"></i> Exit
              </button>
            </>
          )}
        </div>
      )}

      {/* Tombol arah (panah) */}
      <div className={`arrow-navigation ${isInteriorView ? 'interior-arrows' : ''}`}>
        <div className="arrow-row">
          <button
            className="arrow-button up"
            onMouseDown={() => handlePress('up')}
            onMouseUp={() => setKeys(prev => ({ ...prev, up: false }))}
            onTouchStart={() => handlePress('up')}
            onTouchEnd={() => setKeys(prev => ({ ...prev, up: false }))}
          >
            ↑
          </button>
        </div>
        <div className="arrow-row">
          <button
            className="arrow-button left"
            onMouseDown={() => handlePress('left')}
            onMouseUp={() => setKeys(prev => ({ ...prev, left: false }))}
            onTouchStart={() => handlePress('left')}
            onTouchEnd={() => setKeys(prev => ({ ...prev, left: false }))}
          >
            ←
          </button>
          <button
            className="arrow-button down"
            onMouseDown={() => handlePress('down')}
            onMouseUp={() => setKeys(prev => ({ ...prev, down: false }))}
            onTouchStart={() => handlePress('down')}
            onTouchEnd={() => setKeys(prev => ({ ...prev, down: false }))}
          >
            ↓
          </button>
          <button
            className="arrow-button right"
            onMouseDown={() => handlePress('right')}
            onMouseUp={() => setKeys(prev => ({ ...prev, right: false }))}
            onTouchStart={() => handlePress('right')}
            onTouchEnd={() => setKeys(prev => ({ ...prev, right: false }))}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationButton;