import React, { useState } from 'react';
import '../styles/SoundControl.css';

const SoundControl = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="sound-control">
      <img
        src={isSoundOn ? '/assets/volume.png' : '/assets/mute.png'}
        alt="Sound Control"
        onClick={toggleSound}
        className="sound-icon"
      />
    </div>
  );
};

export default SoundControl;