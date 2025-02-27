'use client';
import { useEnvironmentScene } from '@/components/context/EnvironmentSceneContext';
import { Position, Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useMobile } from './context/MobileContext';
import { usePageTransition } from './context/PageTransitionContext';

interface ProjectsProps {
  isDragging: boolean;
  projects: Project[];
  setCurrentHoverProject: (project: Project | null) => void;
  onNavigation: (project: Project) => void;
}

export default function Projects({
  isDragging,
  setCurrentHoverProject,
  projects,
  onNavigation,
}: ProjectsProps) {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const environmentScene = useEnvironmentScene();
  const [isVisible, setIsVisible] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const isSelectableRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pageTransition = usePageTransition();
  const { isMobile, isLoaded } = useMobile();

  useEffect(() => {
    if (isDragging) {
      setIsSelectable(false);
    } else {
      if (isSelectableRef.current) {
        clearTimeout(isSelectableRef.current);
      }
      isSelectableRef.current = setTimeout(() => {
        setIsSelectable(true);
      }, 500);
    }
  }, [isDragging]);

  useEffect(() => {
    if (!environmentScene.scene) {
      return;
    }

    const handleAnimate = (projectsPositions: Position[]) => {
      projectsPositions.forEach((position, i) => {
        const project = projectRefs.current[i];
        const { x, y, z } = position;
        const scale = 1.5 + -z;

        if (project) {
          if (scale > 1) {
            project.style.display = 'none';
          } else {
            project.style.display = 'flex';
          }
          project.style.transform = `translate(${x}px, ${y}px)`;
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

  useEffect(() => {
    if (!environmentScene.scene) {
      return;
    }

    if (pageTransition.shouldStartAnimation) {
      const handleAnimationComplete = () => setIsVisible(true);
      environmentScene.scene.addStartAnimationCompletedCallback(
        handleAnimationComplete
      );

      return () => {
        environmentScene.scene?.removeStartAnimationCompletedCallback(
          handleAnimationComplete
        );
      };
    } else {
      setIsVisible(true);
    }
  }, [environmentScene.scene, pageTransition.shouldStartAnimation]);

  useEffect(() => {
    if (isLoaded) {
      setIsVisible(isMobile ? false : true);
    }
  }, [isMobile, isLoaded]);

  return (
    <>
      {isVisible &&
        projects.map((project, index) => (
          <div
            key={`project-${index}`}
            ref={(el) => {
              if (el) projectRefs.current[index] = el;
            }}
            className="absolute flex-col justify-center items-center z-20 h-0 w-0 will-change-transform hidden xl:flex"
            onMouseEnter={() =>
              isSelectable ? setCurrentHoverProject(project) : null
            }
            onMouseLeave={() => setCurrentHoverProject(null)}
          >
            <div
              className={`cursor-pointer w-[400px] h-[400px]`}
              style={{
                display: !isSelectable ? 'none' : 'flex',
              }}
            >
              <div
                className={`opacity-0 transition-all duration-500 blur-[80px] w-full h-full relative will-change-auto hover:opacity-100 hover:blur-0`}
              >
                <div className="absolute right-0 top-0 translate-x-full z-10 px-4">
                  <h2 className="text-sm font-bold uppercase">
                    {project.title}
                  </h2>
                  <p className="text-sm">{project.data.year}</p>
                </div>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigation(project);
                  }}
                  href={`/projects/${project.slug}`}
                >
                  <Image
                    src={project.data.thumb.src}
                    alt={project.title}
                    style={{
                      width: 400,
                      height: 300,
                    }}
                    width={project.data.thumb.size.width}
                    height={project.data.thumb.size.height}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
