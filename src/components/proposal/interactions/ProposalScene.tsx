import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneConfig } from "../types";

interface Props {
  scene: SceneConfig;
  onComplete: () => void;
}

const ProposalScene = ({ scene, onComplete }: Props) => {
  const [answered, setAnswered] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const noRef = useRef<HTMLButtonElement>(null);

  const handleYes = () => {
    setAnswered(true);
    setTimeout(onComplete, 4000);
  };

  const evadeNo = useCallback(() => {
    setNoAttempts((prev) => prev + 1);

    const maxX = window.innerWidth * 0.4;
    const maxY = window.innerHeight * 0.4;

    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    setNoPos({
      x: randomX,
      y: randomY,
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none px-8 relative">
      <AnimatePresence>
        {!answered ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
          >
            <motion.p
              className="font-display text-4xl md:text-6xl font-light text-foreground text-glow mb-20"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              {scene.texts[0]}
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.button
                className="px-12 py-4 rounded-full glass-surface font-body text-lg tracking-wider text-primary border border-primary/30 glow-ring"
                onClick={handleYes}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px hsl(175 60% 45% / 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Yes
              </motion.button>   {/* ✅ ADD THIS */}

              <motion.button
                ref={noRef}
                className="px-12 py-4 rounded-full glass-surface font-body text-lg tracking-wider text-muted-foreground border border-border/30"

                onMouseEnter={evadeNo}
                onMouseMove={evadeNo}
                onTouchStart={(e) => {
                  e.preventDefault();
                  evadeNo();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  evadeNo();
                }}

                whileHover={{ scale: 1.1 }}

                animate={{
                  x: noPos.x,
                  y: noPos.y,
                  opacity: Math.max(0.4, 1 - noAttempts * 0.1),
                  scale: Math.max(0.85, 1 - noAttempts * 0.03),
                }}

                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                No
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Bloom effect */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              style={{
                background: "radial-gradient(ellipse at center, hsl(175 60% 45% / 0.15), transparent 60%)",
              }}
            />
            {/* Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2 + Math.random() * 4,
                  height: 2 + Math.random() * 4,
                  background: `hsl(175 60% ${50 + Math.random() * 20}% / ${0.3 + Math.random() * 0.4})`,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
            <motion.p
              className="font-display text-3xl md:text-5xl font-light text-foreground text-glow relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              She said yes.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposalScene;
