import React, { useState, useEffect } from 'react';
import Cover from './components/Cover';
import CharacterSelection from './components/CharacterSelection';
import LoadingScreen from './components/LoadingScreen';
import Game from './components/Game';

const App = () => {
  const [gameStage, setGameStage] = useState('cover');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerX, setPlayerX] = useState(0); // Posisi X karakter
  const [playerY, setPlayerY] = useState(0); // Posisi Y karakter
  const [showNotification, setShowNotification] = useState(false);

  const handleStart = () => {
    setGameStage('character');
  };

  const handleCharacterSelect = (data) => {
    setSelectedCharacter(data.character);
    setPlayerName(data.name);
    setGameStage('loading');
    setTimeout(() => {
      setGameStage('game');
    }, 2000);
  };

  // Definisikan koordinat rumah (misalnya titik tengah rumah di x: 150, y: 150)
  const housePosition = { x: 150, y: 150 };
  const proximityDistance = 50; // Jarak deteksi (pixel)

  // Periksa kedekatan dengan rumah
  useEffect(() => {
    if (gameStage === 'game') {
      const distance = Math.sqrt(
        Math.pow(playerX - housePosition.x, 2) + Math.pow(playerY - housePosition.y, 2)
      );
      if (distance <= proximityDistance) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
    }
  }, [playerX, playerY, gameStage]);

  // Fungsi untuk masuk ke dalam rumah
  const handleEnterHouse = () => {
    setShowNotification(false);
    setGameStage('insideHouse'); // Ganti stage ke dalaman rumah
  };

  // Fungsi untuk memperbarui posisi karakter
  const updatePlayerPosition = (x, y) => {
    setPlayerX(x);
    setPlayerY(y);
  };

  return (
    <div>
      {gameStage === 'cover' && <Cover onStart={handleStart} />}
      {gameStage === 'character' && <CharacterSelection onSelect={handleCharacterSelect} />}
      {gameStage === 'loading' && <LoadingScreen />}
      {gameStage === 'game' && (
        <div>
          <Game character={selectedCharacter} playerName={playerName} updatePosition={updatePlayerPosition} />
          {showNotification && (
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px', borderRadius: '5px' }}>
              Anda mendekati rumah! Mau masuk? <button onClick={handleEnterHouse}>Masuk</button>
            </div>
          )}
        </div>
      )}
      {gameStage === 'insideHouse' && <div>Inside House (Tambahkan komponen dalaman rumah di sini)</div>}
    </div>
  );
};

export default App;