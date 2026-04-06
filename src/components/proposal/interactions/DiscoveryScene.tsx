import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneConfig } from "../types";

interface Props {
  scene: SceneConfig;
  onComplete: () => void;
}

const positions = [
  { left: "15%", top: "25%" },
  { left: "65%", top: "20%" },
  { left: "25%", top: "65%" },
  { left: "70%", top: "60%" },
];

const DiscoveryScene = ({ scene, onComplete }: Props) => {
  const [discovered, setDiscovered] = useState<Set<number>>(new Set());
  const total = scene.revealTexts?.length || 0;

  const reveal = (index: number) => {
    setDiscovered((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === total) {
        setTimeout(onComplete, 3000);
      }
      return next;
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none relative">
      <motion.p
        className="font-display text-2xl md:text-3xl font-light text-foreground text-glow mb-8 z-10 text-center px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {scene.texts[0]}
      </motion.p>

      {/* Discovery orbs */}
      {scene.revealTexts?.map((text, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: positions[i]?.left, top: positions[i]?.top }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
        >
          {!discovered.has(i) ? (
            <motion.button
              className="w-12 h-12 rounded-full glass-surface glow-ring flex items-center justify-center"
              onClick={() => reveal(i)}
              whileHover={{ scale: 1.15, boxShadow: "0 0 40px hsl(175 60% 45% / 0.4)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 15px hsl(175 60% 45% / 0.15)",
                  "0 0 25px hsl(175 60% 45% / 0.3)",
                  "0 0 15px hsl(175 60% 45% / 0.15)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-primary/60" />
            </motion.button>
          ) : (
            <motion.div
              className="max-w-[200px] md:max-w-[260px] text-center"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-display text-base md:text-lg font-light text-reveal italic leading-relaxed">
                {text}
              </p>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Counter */}
      <motion.p
        className="interaction-hint absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {discovered.size < total
          ? `${discovered.size} / ${total} discovered`
          : "all found"}
      </motion.p>
    </div>
  );
};

export default DiscoveryScene;
