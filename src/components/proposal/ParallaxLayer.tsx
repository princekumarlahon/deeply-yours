import { useEffect, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  intensity?: number;
}

const ParallaxLayer = ({ children, intensity = 15 }: ParallaxLayerProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * intensity;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity, mouseX, mouseY]);

  return (
    <motion.div style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
