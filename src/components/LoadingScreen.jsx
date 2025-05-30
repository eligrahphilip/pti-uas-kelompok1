import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const NatureLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing forest...');
  const [tips] = useState([
    'Ancient trees whisper secrets to those who listen...',
    'Beware of the mushrooms that glow at night...',
    'The river spirits know all paths through the woods...',
    'Wolves howl when danger approaches...',
    'Some flowers bloom only under moonlight...'
  ]);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const totalDuration = 30000; // 20 seconds in milliseconds
    const startTime = Date.now();
    const endTime = startTime + totalDuration;
    
    // Smooth progress animation
    const animateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
      
      if (now < endTime) {
        requestAnimationFrame(animateProgress);
      }
    };

    // Status message rotation
    const messages = [
      'Initializing forest...',
      'Loading wildlife...',
      'Generating terrain...',
      'Preparing quests...',
      'Summoning creatures...',
      'Finalizing adventure...'
    ];
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setStatusMessage(messages[messageIndex]);
    }, 1500); // Change message every 1.5 seconds

    // Tip rotation
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 3000); // Change tip every 3 seconds

    // Start progress animation
    requestAnimationFrame(animateProgress);

    return () => {
      clearInterval(messageInterval);
      clearInterval(tipInterval);
    };
  }, [tips.length]);

  return (
    <div className="loading-screen">
      {[...Array(30)].map((_, i) => (
        <div
          key={`leaf-${i}`}
          className="falling-leaf"
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <div
          key={`firefly-${i}`}
          className="firefly"
        />
      ))}
      <div className="loading-content">
        <div className="tree-logo" />
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          >
            <div className="progress-text">{statusMessage}</div>
          </div>
        </div>
        <div className="progress-percentage">
          {Math.round(progress)}%
          <span className="leaf-icon">🌿</span>
        </div>
        <div className="nature-elements">
          <div className="nature-element tree">🌲</div>
          <div className="nature-element mushroom">🍄</div>
          <div className="nature-element bird">🐦</div>
        </div>
        <div className="tip-box">
          <p>Tip: {tips[currentTip]}</p>
        </div>
      </div>
      <div className="forest-floor" />
    </div>
  );
};

export default NatureLoadingScreen;