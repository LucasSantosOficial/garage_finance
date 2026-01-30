import { useEffect, useRef, useState } from "react";
import styles from "./BackgroundMusic.module.css";

const PLAYLIST = [
  {
    name: "Midnight Club 3 DUB Edition – Game Theme #2",
    src: "/audio/ambient.mp3",
  },
  {
    name: "Midnight Club 3 – Dammit Man",
    src: "/audio/ambient1.mp3",
  },
  {
    name: "Midnight Club 3 – Freek-A-Leek",
    src: "/audio/ambient2.mp3",
  },
  {
    name: "Fabolous feat. Thara – Ghetto",
    src: "/audio/ambient3.mp3",
  },
  {
    name: "Mannie Fresh – Real Big",
    src: "/audio/ambient4.mp3",
  },
];

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.25);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.play();
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    playing ? pause() : play();
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) =>
      prev === 0 ? PLAYLIST.length - 1 : prev - 1
    );
    setPlaying(true);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (playing) play();
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <audio
        ref={audioRef}
        src={PLAYLIST[currentTrack].src}
        onEnded={nextTrack}
      />

      <div className={styles.player}>
        {/* 🎵 Nome da música */}
        <div className={styles.trackName}>
          {PLAYLIST[currentTrack].name}
        </div>

        {/* 🎛️ Controles */}
        <div className={styles.musicControls}>
          <button onClick={prevTrack} className={styles.musicBtn}>
            ⏮️
          </button>

          <button onClick={togglePlay} className={styles.musicBtn}>
            {playing ? "⏸️" : "▶️"}
          </button>

          <button onClick={nextTrack} className={styles.musicBtn}>
            ⏭️
          </button>
        </div>

        {/* 🔊 Volume */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={styles.volume}
        />
      </div>
    </>
  );
}
