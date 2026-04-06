import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { scenes } from "./scenes";
import SceneRenderer from "./SceneRenderer";
import AudioPlayer from "./AudioPlayer";

const SceneEngine = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToNext = useCallback(() => {
    setDirection(1);
    setTimeout(() => {
      setCurrentScene((prev) => Math.min(prev + 1, scenes.length - 1));
    }, 400);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentScene((prev) => Math.max(prev - 1, 0));
  }, []);

  const scene = scenes[currentScene];
  console.log("Current Scene:", scene);

  return (
    <div className="scene-fullscreen overflow-hidden">
      <AudioPlayer />

      <AnimatePresence mode="sync">
        <SceneRenderer
          key={scene.id}
          scene={scene}
          onNext={goToNext}
          onPrev={goToPrev}
          sceneIndex={currentScene}
          totalScenes={scenes.length}
        />
      </AnimatePresence>
    </div>
  );
};

export default SceneEngine;
