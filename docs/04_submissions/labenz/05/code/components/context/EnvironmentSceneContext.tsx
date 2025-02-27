'use client';
import { EnvironmentScene } from '@/lib/EnvironmentScene';
import { createContext, useContext, useEffect, useState } from 'react';
import { useMobile } from './MobileContext';

type EnvironmentSceneContextType = {
  scene: EnvironmentScene | null;
};

const EnvironmentSceneContext = createContext<EnvironmentSceneContextType>({
  scene: null,
});

export const useEnvironmentScene = () => useContext(EnvironmentSceneContext);

export default function EnvironmentSceneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scene, setScene] = useState<EnvironmentScene | null>(null);
  const { isMobile, isLoaded } = useMobile();

  useEffect(() => {
    const initScene = () => {
      if (typeof window === 'undefined') return;
      if (scene) return;
      const environmentScene = new EnvironmentScene();
      setScene(environmentScene);
    };

    if (!isMobile && isLoaded) {
      initScene();
      if (scene) {
        scene.activateAnimation();
      }
    } else {
      if (scene) {
        scene.deactivateAnimation();
      }
    }

    return () => {};
  }, [isMobile, isLoaded, scene]);

  return (
    <EnvironmentSceneContext.Provider value={{ scene }}>
      {children}
    </EnvironmentSceneContext.Provider>
  );
}
