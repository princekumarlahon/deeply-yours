import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().catch(() => {});

        let vol = 0;
        const fade = setInterval(() => {
          if (!audioRef.current) return;

          vol += 0.02;
          audioRef.current.volume = Math.min(vol, 0.4);

          if (vol >= 0.4) clearInterval(fade);
        }, 100);
      }

      // ✅ NOW OUTSIDE IF (correct)
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/music.mp3"
      loop
      preload="auto"
    />
  );
};

export default AudioPlayer;