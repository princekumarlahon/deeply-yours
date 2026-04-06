import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneConfig } from "../types";
import ParallaxLayer from "../ParallaxLayer";

interface Props {
  scene: SceneConfig;
  onComplete: () => void;
}

const TapScene = ({ scene, onComplete }: Props) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = scene.texts;
  const isEntry = texts.length === 0;

  const handleTap = () => {
    if (isEntry || textIndex >= texts.length - 1) {
      onComplete();
    } else {
      setTextIndex((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none px-8"
      onClick={handleTap}
      whileTap={{ scale: 0.995 }}
    >
      <ParallaxLayer>
        <div className="text-center max-w-lg">
          {isEntry ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-12 rounded-full border border-primary/30 animate-glow-pulse"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                className="font-display text-2xl md:text-4xl font-light leading-relaxed text-foreground text-glow"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {texts[textIndex]}
              </motion.p>
            </AnimatePresence>
          )}
        </div>
      </ParallaxLayer>

      <motion.p
        className="interaction-hint absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isEntry ? 2.5 : 1, duration: 1 }}
      >
        {scene.hint}
      </motion.p>
    </motion.div>
  );
};

export default TapScene;
