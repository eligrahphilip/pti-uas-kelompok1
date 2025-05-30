import React, { useEffect, useState, useCallback } from 'react';
import NavigationButton from './NavigationButton'; // Impor komponen baru
import '../styles/Game.css';

// Fallback background image
const FALLBACK_INTERIOR_BACKGROUND = '/assets/maps/default-interior.jpg';

// Character assets
const CHARACTER_ASSETS = {
  Warrior: '/assets/avatar/karakter1.gif',
  Mage: '/assets/avatar/karakter2.gif',
  Archer: '/assets/avatar/karakter3.gif'
};

const Game = ({ character, playerName }) => {
  // Player state
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [interiorPosition, setInteriorPosition] = useState({ x: 50, y: 70 });
  const [facingRight, setFacingRight] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const speed = 2;

  // Game state
  const [currentView, setCurrentView] = useState('world');
  const [visitedMaps, setVisitedMaps] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // Game maps data
  const [maps] = useState([
    {
      id: 'house',
      name: 'House',
      position: { x: 16, y: 55 },
      notification: 'Welcome home',
      interiorBackground: '/assets/dalaman_maps/house-interior.jpg'
    },
    {
      id: 'mall',
      name: 'Shopping Mall',
      position: { x: 27, y: 23.5 },
      notification: 'Welcome to the Mall',
      interiorBackground: '/assets/dalaman_maps/background-mall.jpg'
    },
    {
      id: 'mountain',
      name: 'Mountain',
      position: { x: 85, y: 23.5 },
      notification: 'Welcome to the Mountain',
      interiorBackground: '/assets/dalaman_maps/mountain-interior.jpg'
    },
    {
      id: 'beach',
      name: 'Beach',
      position: { x: 82.5, y: 77.5 },
      notification: 'Welcome to the Beach',
      interiorBackground: '/assets/dalaman_maps/beach-interior.jpg'
    },
    {
      id: 'gym',
      name: 'Gym',
      position: { x: 53, y: 20 },
      notification: 'Welcome to the Gym',
      interiorBackground: '/assets/dalaman_maps/gym-interior.jpg'
    }
  ]);

  // Interaction state
  const [currentMap, setCurrentMap] = useState(null);
  const [showMapNotification, setShowMapNotification] = useState(false);
  const [mapNotification, setMapNotification] = useState('');
  const [notification, setNotification] = useState({ message: '', visible: false });

  // Keyboard controls state
  const [keys, setKeys] = useState({
    up: false,
    down: false,
    left: false,
    right: false
  });

  // Check proximity to maps
  useEffect(() => {
    if (currentView !== 'world') return;

    const checkMapProximity = () => {
      let closestMap = null;
      let minDistance = Infinity;

      maps.forEach(map => {
        const distance = Math.sqrt(
          Math.pow(position.x - map.position.x, 2) +
          Math.pow(position.y - map.position.y, 2)
        );

        if (distance <= 10 && distance < minDistance) {
          minDistance = distance;
          closestMap = map;
        }
      });

      if (closestMap && closestMap.id !== currentMap) {
        setCurrentMap(closestMap.id);
        setMapNotification(closestMap.notification);
        setShowMapNotification(true);
      } else if (!closestMap && currentMap) {
        setCurrentMap(null);
        setShowMapNotification(false);
      }
    };

    checkMapProximity();
  }, [position, maps, currentMap, currentView]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': setKeys(prev => ({ ...prev, up: true })); break;
        case 'ArrowDown': case 's': case 'S': setKeys(prev => ({ ...prev, down: true })); break;
        case 'ArrowLeft': case 'a': case 'A': setKeys(prev => ({ ...prev, left: true })); break;
        case 'ArrowRight': case 'd': case 'D': setKeys(prev => ({ ...prev, right: true })); break;
        case 'Escape': 
          if (currentView !== 'world') exitMap();
          if (showMenu) setShowMenu(false);
          break;
        case 'm': case 'M': toggleMenu(); break;
        case 'r': case 'R': returnToWorld(); break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': setKeys(prev => ({ ...prev, up: false })); break;
        case 'ArrowDown': case 's': case 'S': setKeys(prev => ({ ...prev, down: false })); break;
        case 'ArrowLeft': case 'a': case 'A': setKeys(prev => ({ ...prev, left: false })); break;
        case 'ArrowRight': case 'd': case 'D': setKeys(prev => ({ ...prev, right: false })); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentView, showMenu]);

  // Handle character movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (currentView === 'world') {
        setPosition(prev => {
          let newX = prev.x;
          let newY = prev.y;
          let moved = false;

          if (keys.up) { newY = Math.max(0, prev.y - speed); moved = true; }
          if (keys.down) { newY = Math.min(100, prev.y + speed); moved = true; }
          if (keys.left) { newX = Math.max(0, prev.x - speed); moved = true; }
          if (keys.right) { newX = Math.min(100, prev.x + speed); moved = true; }

          if (keys.left && !keys.right) setFacingRight(false);
          if (keys.right && !keys.left) setFacingRight(true);

          setIsMoving(moved);
          return moved ? { x: newX, y: newY } : prev;
        });
      } else {
        setInteriorPosition(prev => {
          let newX = prev.x;
          let newY = prev.y;
          let moved = false;

          if (keys.up) { newY = Math.max(20, prev.y - speed); moved = true; }
          if (keys.down) { newY = Math.min(80, prev.y + speed); moved = true; }
          if (keys.left) { newX = Math.max(20, prev.x - speed); moved = true; }
          if (keys.right) { newX = Math.min(80, prev.x + speed); moved = true; }

          if (keys.left && !keys.right) setFacingRight(false);
          if (keys.right && !keys.left) setFacingRight(true);

          setIsMoving(moved);
          return moved ? { x: newX, y: newY } : prev;
        });
      }
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keys, currentView]);

  // Notification functions
  const showNotification = useCallback((message) => {
    setNotification({ message, visible: true });
    setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000);
  }, []);

  const handleMapInteraction = useCallback((action) => {
    if (!currentMap) return;

    if (action === 'enter') {
      setCurrentView(currentMap);
      if (!visitedMaps.includes(currentMap)) {
        setVisitedMaps(prev => [...prev, currentMap]);
      }
    } else {
      showNotification(mapNotification);
    }
    setShowMapNotification(false);
  }, [currentMap, mapNotification, visitedMaps, showNotification]);

  const exitMap = useCallback(() => {
    setCurrentView('world');
    const map = maps.find(m => m.id === currentView);
    if (map) setPosition(map.position);
    showNotification('Returned to world map');
  }, [currentView, maps, showNotification]);

  const returnToWorld = useCallback(() => {
    if (currentView !== 'world') {
      exitMap();
    }
  }, [currentView, exitMap]);

  const toggleMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  const quickTravel = useCallback((mapId) => {
    const map = maps.find(m => m.id === mapId);
    if (map) {
      setPosition(map.position);
      setShowMenu(false);
      showNotification(`Quick traveled to ${map.name}`);
    }
  }, [maps, showNotification]);

  // Arrow button handlers
  const handleArrowPress = (direction) => {
    setKeys(prev => ({ ...prev, [direction]: true }));
    
    setTimeout(() => {
      setKeys(prev => ({ ...prev, [direction]: false }));
    }, 100);
  };

  // Render map view
  const renderMapView = () => {
    const map = maps.find(m => m.id === currentView);
    if (!map) return null;

    const backgroundImage = map.interiorBackground || FALLBACK_INTERIOR_BACKGROUND;

    return (
      <div className="interior-container">
        <div
          className="map-view"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <img
            src={backgroundImage}
            alt="Map background"
            style={{ display: 'none' }}
            onError={() => console.error(`Failed to load background: ${backgroundImage}`)}
          />
          <div className="map-header">
            <div className="exit-symbol" onClick={exitMap} title="Exit"></div>
          </div>
          <div className="map-content">
            <div
              className={`player-character ${isMoving ? 'moving' : ''}`}
              style={{
                left: `${interiorPosition.x}%`,
                top: `${interiorPosition.y}%`,
                transform: `translate(-50%, -50%) scaleX(${facingRight ? 1 : -1})`
              }}
            >
              <img
                src={CHARACTER_ASSETS[character] || CHARACTER_ASSETS.Warrior}
                alt={character}
                onError={(e) => { e.target.src = CHARACTER_ASSETS.Warrior; }}
              />
            </div>
          </div>
          {/* Gunakan NavigationButton untuk tombol navigasi */}
          <NavigationButton
            handleArrowPress={handleArrowPress}
            setKeys={setKeys}
            toggleMenu={toggleMenu}
            returnToWorld={returnToWorld}
            exitMap={exitMap}
            isInteriorView={true}
          />
          <div className="map-navigation-sidebar">
            <div className="sidebar-header">
              <h3>{map.name}</h3>
              <p>Welcome to {map.name}</p>
            </div>
            <div className="sidebar-controls">
              <div className="control-group">
                <h4>Movement</h4>
                <div className="arrow-grid">
                  <button 
                    className="arrow-button up" 
                    onMouseDown={() => handleArrowPress('up')}
                    onMouseUp={() => setKeys(prev => ({ ...prev, up: false }))}
                    onTouchStart={() => handleArrowPress('up')}
                    onTouchEnd={() => setKeys(prev => ({ ...prev, up: false }))}
                  >
                    ↑
                  </button>
                  <button 
                    className="arrow-button left" 
                    onMouseDown={() => handleArrowPress('left')}
                    onMouseUp={() => setKeys(prev => ({ ...prev, left: false }))}
                    onTouchStart={() => handleArrowPress('left')}
                    onTouchEnd={() => setKeys(prev => ({ ...prev, left: false }))}
                  >
                    ←
                  </button>
                  <button 
                    className="arrow-button down" 
                    onMouseDown={() => handleArrowPress('down')}
                    onMouseUp={() => setKeys(prev => ({ ...prev, down: false }))}
                    onTouchStart={() => handleArrowPress('down')}
                    onTouchEnd={() => setKeys(prev => ({ ...prev, down: false }))}
                  >
                    ↓
                  </button>
                  <button 
                    className="arrow-button right" 
                    onMouseDown={() => handleArrowPress('right')}
                    onMouseUp={() => setKeys(prev => ({ ...prev, right: false }))}
                    onTouchStart={() => handleArrowPress('right')}
                    onTouchEnd={() => setKeys(prev => ({ ...prev, right: false }))}
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="control-group">
                <h4>Actions</h4>
                <button 
                  className="action-button return-button"
                  onClick={returnToWorld}
                >
                  <i className="fas fa-globe"></i> World Map
                </button>
                <button 
                  className="action-button exit-button"
                  onClick={exitMap}
                >
                  <i className="fas fa-door-open"></i> Exit
                </button>
              </div>
              <div className="control-group">
                <h4>Quick Actions</h4>
                <button className="action-button">
                  <i className="fas fa-search"></i> Examine
                </button>
                <button className="action-button">
                  <i className="fas fa-comment"></i> Talk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render world view
  const renderWorldView = () => {
    const worldMap = maps.find(m => m.id === 'world') || { worldBackground: '/assets/maps/world-map.jpg' };

    return (
      <div
        className="game-background"
        style={{
          backgroundImage: `url(${worldMap.worldBackground})`,
        }}
      >
        <div className="player-info">
          <h2>Welcome, {playerName}!</h2>
          <p>Character: {character}</p>
          <p>Visited locations: {visitedMaps.length}/{maps.length}</p>
        </div>
        <div
          className={`player-character ${isMoving ? 'moving' : ''}`}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `translate(-50%, -50%) scaleX(${facingRight ? 1 : -1})`
          }}
        >
          <img
            src={CHARACTER_ASSETS[character] || CHARACTER_ASSETS.Warrior}
            alt={character}
            onError={(e) => { e.target.src = CHARACTER_ASSETS.Warrior; }}
          />
        </div>
        {maps.map((map) => (
          <div
            key={map.id}
            className={`map-marker ${visitedMaps.includes(map.id) ? 'visited' : ''}`}
            style={{
              left: `${map.position.x}%`,
              top: `${map.position.y}%`,
              backgroundImage: `url(${map.worldBackground})`,
            }}
            title={map.name}
          >
            {visitedMaps.includes(map.id) && <span className="visited-dot"></span>}
          </div>
        ))}
        {showMapNotification && (
          <div
            className="map-notification"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
          >
            <h3>{mapNotification}</h3>
            <div className="notification-buttons">
              <button onClick={() => handleMapInteraction('enter')}>Enter</button>
              <button onClick={() => handleMapInteraction('Cancel')}>Cancel</button>
            </div>
          </div>
        )}
        {notification.visible && (
          <div className="main-notification">
            {notification.message}
          </div>
        )}
        {/* Gunakan NavigationButton untuk tombol navigasi */}
        <NavigationButton
          handleArrowPress={handleArrowPress}
          setKeys={setKeys}
          toggleMenu={toggleMenu}
          returnToWorld={returnToWorld}
          exitMap={exitMap}
          isWorldView={true}
        />
        {showMenu && (
          <div className="game-menu">
            <div className="menu-header">
              <h3>Game Menu</h3>
              <button className="close-menu" onClick={toggleMenu}>×</button>
            </div>
            <div className="menu-content">
              <div className="menu-section">
                <h4>Quick Travel</h4>
                <div className="quick-travel-options">
                  {maps.filter(map => visitedMaps.includes(map.id)).map(map => (
                    <button 
                      key={map.id} 
                      className="travel-option"
                      onClick={() => quickTravel(map.id)}
                    >
                      {map.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="menu-section">
                <h4>Game Options</h4>
                <button className="menu-option">Settings</button>
                <button className="menu-option">Help</button>
                <button className="menu-option">Save Game</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="game-container">
      {currentView === 'world' ? renderWorldView() : renderMapView()}
    </div>
  );
};

export default Game;