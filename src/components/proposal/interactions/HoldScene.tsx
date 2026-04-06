import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneConfig } from "../types";
import ParallaxLayer from "../ParallaxLayer";

interface Props {
  scene: SceneConfig;
  onComplete: () => void;
}

const HoldScene = ({ scene, onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showInitial, setShowInitial] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startHold = useCallback(() => {
    if (revealed) return;
    setShowInitial(false);
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1.5, 100);
        if (next >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setRevealed(true);
        }
        return next;
      });
    }, 30);
  }, [revealed]);

  const stopHold = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!revealed) {
      setProgress((prev) => Math.max(prev - 5, 0));
    }
  }, [revealed]);

  // Delay before allowing tap-to-continue so user can read the text
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setCanContinue(true), 3000);
    return () => clearTimeout(timer);
  }, [revealed]);

  const handleContinue = useCallback(() => {
    if (revealed && canContinue) onComplete();
  }, [revealed, canContinue, onComplete]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center select-none px-8"
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseLeave={stopHold}
      onTouchStart={startHold}
      onTouchEnd={stopHold}
      onClick={handleContinue}
    >
      <ParallaxLayer>
        <div className="text-center max-w-lg">
          <AnimatePresence mode="wait">
            {showInitial && scene.texts.map((text, i) => (
              <motion.p
                key={`init-${i}`}
                className="font-display text-2xl md:text-3xl font-light text-foreground mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.6, duration: 0.8 }}
              >
                {text}
              </motion.p>
            ))}
          </AnimatePresence>

          {!showInitial && !revealed && (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Hold ring */}
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="hsl(190 20% 18% / 0.3)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="hsl(175 60% 45% / 0.7)"
                    strokeWidth="1.5"
                    strokeDasharray={`${progress * 2.83} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-75"
                  />
                </svg>
                <div
                  className="absolute inset-0 rounded-full transition-all duration-100"
                  style={{
                    boxShadow: `0 0 ${progress * 0.5}px hsl(175 60% 45% / ${progress * 0.004})`,
                  }}
                />
              </div>
            </motion.div>
          )}

          {revealed && scene.revealTexts?.map((text, i) => (
            <motion.p
              key={`reveal-${i}`}
              className="font-display text-2xl md:text-3xl font-light text-foreground text-glow mb-4"
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.8, duration: 1 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </ParallaxLayer>

      <motion.p
        className="interaction-hint absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {scene.hint}
      </motion.p>
      {revealed && (
        <motion.p
          className="interaction-hint absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: canContinue ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          tap to continue
        </motion.p>
      )}
    </motion.div>
  );
};

export default HoldScene;
