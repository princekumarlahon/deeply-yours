import { motion } from "framer-motion";
import { SceneConfig } from "./types";
import TapScene from "./interactions/TapScene";
import HoldScene from "./interactions/HoldScene";
import DragScene from "./interactions/DragScene";
import DiscoveryScene from "./interactions/DiscoveryScene";
import ProposalScene from "./interactions/ProposalScene";
import FinalScene from "./interactions/FinalScene";
import SceneBackground from "./SceneBackground";

interface SceneRendererProps {
  scene: SceneConfig;
  onNext: () => void;
  onPrev: () => void;
  sceneIndex: number;
  totalScenes: number;
}

const SceneRenderer = ({ scene, onNext, sceneIndex, totalScenes }: SceneRendererProps) => {  const renderInteraction = () => {
    switch (scene.interaction) {
      case "tap":
        return <TapScene scene={scene} onComplete={onNext} />;
      case "hold":
        return <HoldScene scene={scene} onComplete={onNext} />;
      case "drag":
        return <DragScene scene={scene} onComplete={onNext} />;
      case "discovery":
        return <DiscoveryScene scene={scene} onComplete={onNext} />;
      case "proposal":
        return <ProposalScene scene={scene} onComplete={onNext} />;
      case "final":
        return <FinalScene scene={scene} />;
      default:
        return <TapScene scene={scene} onComplete={onNext} />;
    }
  };

  return (
    <motion.div
      key={scene.id}
      className="scene-fullscreen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <SceneBackground type={scene.background} />
      {/* Progress indicator */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
        {Array.from({ length: totalScenes }).map((_, i) => (
          <div
            key={i}
            className="h-0.5 w-6 rounded-full transition-all duration-700"
            style={{
              backgroundColor: i <= sceneIndex
                ? "hsl(175 60% 45% / 0.6)"
                : "hsl(190 20% 18% / 0.4)",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {renderInteraction()}
      </div>
    </motion.div>
    
  );
};

export default SceneRenderer;
