import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./gameMusic.css";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Initialize the volume state with a default value
  const location = useLocation();

  useEffect(() => {
    const playAudio = () => {
      audioRef.current.play();
      setIsPlaying(true);
    };
    const button = document.getElementById("playMusic");
    if (button) {
      button.addEventListener("click", playAudio);
    }
    return () => {
      if (button) {
        button.removeEventListener("click", playAudio);
      }
    };
  }, []);

  useEffect(() => {
    const isMuted = localStorage.getItem("isMuted") === "true";
    if (location.pathname === "/") {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (isMuted) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume; // Set the volume to the current value of the volume state
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [location, volume]); // Add the volume state to the dependencies of the effect

  const handleToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("isMuted", true);
    } else {
      audioRef.current.volume = volume; // Set the volume to the current value of the volume state
      audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem("isMuted", false);
    }
  };

  if (location.pathname === "/") {
    return <audio ref={audioRef} src="/backgroundMusic.mp3" loop />;
  }

  return (
    <div className="musicDiv">
      <audio ref={audioRef} src="/backgroundMusic.mp3" loop />
      <button className="toggleMusic" onClick={handleToggle}>
        {isPlaying ? <img src="soundOnicon.svg" /> : <img src="muteIcon.svg" />}
      </button>
    </div>
  );
};

export default BackgroundMusic;
