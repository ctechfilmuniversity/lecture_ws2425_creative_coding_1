'use client';
import { useEnvironmentScene } from '@/components/context/EnvironmentSceneContext';

import { Category, Position, Project } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { useMobile } from './context/MobileContext';

interface CategoriesProps {
  categories: Category[];
  activeProject: Project | null;
}

export default function Categories({
  categories,
  activeProject,
}: CategoriesProps) {
  const categoryRefs = useRef<HTMLDivElement[]>([]);
  const environmentScene = useEnvironmentScene();
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile, isLoaded } = useMobile();

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(isMobile ? false : true);
    }
  }, [isMobile, isLoaded]);

  useEffect(() => {
    if (!environmentScene.scene) {
      return;
    }

    const handleAnimate = (
      _projectsPositions: Position[],
      categoriesPositions: Position[]
    ) => {
      categoriesPositions.forEach((position, i) => {
        const category = categoryRefs.current[i];
        if (category) {
          const { x, y } = position;
          category.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    environmentScene.scene.addAnimationCallback(handleAnimate);

    return () => {
      if (!environmentScene.scene) {
        return;
      }
      environmentScene.scene.removeAnimationCallback(handleAnimate);
    };
  }, [environmentScene.scene]);

  return (
    <>
      {isVisible &&
        categories.map((category, index) => (
          <div
            key={`category-${index}`}
            ref={(el) => {
              if (el) categoryRefs.current[index] = el;
            }}
            className={`absolute w-0 h-0 z-20 hidden xl:flex justify-center items-center `}
          >
            <h2
              className={`text-sm uppercase font-light whitespace-nowrap transition-all duration-500 text-gray-400 ${
                activeProject
                  ? activeProject.data.categories.includes(category.title)
                    ? 'blur-0'
                    : 'blur-sm'
                  : 'blur-0'
              }`}
            >
              {category.title}
            </h2>
          </div>
        ))}
    </>
  );
}
