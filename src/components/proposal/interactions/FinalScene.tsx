import { motion } from "framer-motion";
import { SceneConfig } from "../types";

interface Props {
  scene: SceneConfig;
}

const FinalScene = ({ scene }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none px-8 relative">
      {/* Warm glow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        style={{
          background: "radial-gradient(ellipse at 50% 50%, hsl(175 40% 20% / 0.2), transparent 60%)",
        }}
      />

      <motion.p
        className="font-display text-4xl md:text-6xl font-light text-foreground text-glow relative z-10 text-center"
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {scene.texts[0]}
      </motion.p>

      <motion.div
        className="mt-12 w-24 h-px bg-primary/30 relative z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 2 }}
      />
    </div>
  );
};

export default FinalScene;
