import { motion } from "framer-motion";

const backgrounds: Record<string, string> = {
  ocean: "radial-gradient(ellipse at 30% 50%, hsl(185 40% 12%), hsl(195 40% 6%) 70%)",
  night: "radial-gradient(ellipse at 70% 30%, hsl(190 30% 10%), hsl(200 35% 5%) 80%)",
  deep: "radial-gradient(ellipse at 50% 60%, hsl(180 25% 8%), hsl(195 40% 4%) 75%)",
  glow: "radial-gradient(ellipse at 50% 50%, hsl(175 35% 14%), hsl(195 40% 6%) 60%)",
  clear: "radial-gradient(ellipse at 50% 40%, hsl(175 40% 10%), hsl(195 40% 5%) 70%)",
};

const SceneBackground = ({ type = "ocean" }: { type?: string }) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-0"
        style={{ background: backgrounds[type] || backgrounds.ocean }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(175 60% 45% / 0.08), transparent 70%)"
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      {/* Ambient particles */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: `hsl(175 60% 50% / ${0.1 + Math.random() * 0.15})`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SceneBackground;
