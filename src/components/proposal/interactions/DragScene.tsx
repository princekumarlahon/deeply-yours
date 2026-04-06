import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { SceneConfig } from "../types";

interface Props {
  scene: SceneConfig;
  onComplete: () => void;
}

const REVEAL_THRESHOLD = 110;
const MAX_DRAG = 160;

const DragScene = ({ scene, onComplete }: Props) => {
  const [dragDistance, setDragDistance] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const progress = Math.min(dragDistance / REVEAL_THRESHOLD, 1);
  const blurAmount = revealed ? 0 : 20 - progress * 20;
  const textOpacity = revealed ? 1 : 0.2 + progress * 0.8;
  const overlayOpacity = revealed ? 0 : 0.8 - progress * 0.8;

  const completeReveal = useCallback(() => {
    setRevealed(true);
    setDragDistance(REVEAL_THRESHOLD);
  }, []);

  const handleDrag = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (revealed) return;

    const nextDistance = Math.max(0, Math.min(info.offset.x, MAX_DRAG));
    setDragDistance(nextDistance);

    if (nextDistance >= REVEAL_THRESHOLD && !revealed) {
      completeReveal();
    }
  }, [completeReveal, revealed]);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (revealed) return;

    if (info.offset.x >= REVEAL_THRESHOLD) {
      completeReveal();
      return;
    }

    setDragDistance(0);
  }, [completeReveal, revealed]);

  useEffect(() => {
    if (!revealed) return;

    const timer = window.setTimeout(onComplete, 1800);
    return () => window.clearTimeout(timer);
  }, [revealed, onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none px-8">
      <div className="text-center max-w-lg relative">
        <motion.p
          className="font-display text-xl md:text-2xl font-light text-foreground/60 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {scene.texts[0]}
        </motion.p>

        <div className="relative min-h-[96px] flex items-center justify-center">
          <motion.p
            className="font-display text-2xl md:text-4xl font-light text-foreground text-glow"
            style={{
              opacity: textOpacity,
              filter: `blur(${blurAmount}px)`,
            }}
          >
            {scene.revealTexts?.[0]}
          </motion.p>

          {!revealed && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                opacity: overlayOpacity,
                background: "radial-gradient(ellipse, hsl(190 30% 8% / 0.9), transparent)",
              }}
            />
          )}
        </div>

        {!revealed ? (
          <motion.div
            className="mt-12 mx-auto w-16 h-16 rounded-full glass-surface flex items-center justify-center cursor-grab active:cursor-grabbing glow-ring"
            drag="x"
            dragConstraints={{ left: 0, right: MAX_DRAG }}
            dragElastic={0}
            style={{ x: dragDistance }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        ) : (
          <motion.p
            className="mt-12 interaction-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            continuing...
          </motion.p>
        )}
      </div>

      {!revealed && (
        <motion.p
          className="interaction-hint absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {scene.hint}
        </motion.p>
      )}
    </div>
  );
};

export default DragScene;
