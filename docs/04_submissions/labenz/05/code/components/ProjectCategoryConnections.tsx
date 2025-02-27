'use client';
import { useEnvironmentScene } from '@/components/context/EnvironmentSceneContext';
import { Category, Position, Project } from '@/lib/types';
import { useEffect, useMemo, useRef, useState } from 'react';

interface ProjectCategoryConnectionsProps {
  activeProject: Project | null;
  categories: Category[];
  projects: Project[];
  projectOffset?: number;
  categoryOffset?: number;
}

export default function ProjectCategoryConnections({
  activeProject,
  categories,
  projects,
  projectOffset = 250,
  categoryOffset = 80,
}: ProjectCategoryConnectionsProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<SVGLineElement[]>([]);
  const environmentScene = useEnvironmentScene();
  const activeProjectRef = useRef(activeProject);
  const [opacity, setOpacity] = useState(0);

  const { relevantCategoryIndices, activeProjectIndex } = useMemo(() => {
    if (!activeProject) {
      return { relevantCategoryIndices: [], activeProjectIndex: null };
    }

    const projectIndex = projects.findIndex((p) => p.id === activeProject.id);
    if (projectIndex === -1) {
      return { relevantCategoryIndices: [], activeProjectIndex: null };
    }

    const categoryNames = activeProject.data.categories;
    const indices = categories
      .map((category, index) => ({ category, index }))
      .filter(({ category }) => categoryNames.includes(category.title))
      .map(({ index }) => index);

    return {
      relevantCategoryIndices: indices,
      activeProjectIndex: projectIndex,
    };
  }, [activeProject, categories, projects]);

  useEffect(() => {
    lineRefs.current = lineRefs.current.slice(
      0,
      relevantCategoryIndices.length
    );
  }, [relevantCategoryIndices]);

  useEffect(() => {
    if (!environmentScene.scene) {
      return;
    }

    const handleAnimate = (
      projectsPositions: Position[],
      categoriesPositions: Position[]
    ) => {
      if (activeProjectIndex === null) return;

      relevantCategoryIndices.forEach((categoryIndex, i) => {
        const line = lineRefs.current[i];
        if (!line) return;

        const projectPos = projectsPositions[activeProjectIndex];
        const categoryPos = categoriesPositions[categoryIndex];

        if (!projectPos || !categoryPos) return;

        const dx = categoryPos.x - projectPos.x;
        const dy = categoryPos.y - projectPos.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        const nx = dx / length;
        const ny = dy / length;

        const x1 = projectPos.x + nx * projectOffset;
        const y1 = projectPos.y + ny * projectOffset;
        const x2 = categoryPos.x - nx * categoryOffset;
        const y2 = categoryPos.y - ny * categoryOffset;

        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
      });
    };

    environmentScene.scene.addAnimationCallback(handleAnimate);

    return () => {
      if (environmentScene.scene) {
        environmentScene.scene.removeAnimationCallback(handleAnimate);
      }
    };
  }, [
    environmentScene.scene,
    activeProjectIndex,
    relevantCategoryIndices,
    projectOffset,
    categoryOffset,
  ]);

  useEffect(() => {
    if (activeProject) {
      requestAnimationFrame(() => setOpacity(1));
    } else {
      requestAnimationFrame(() => setOpacity(0));
    }
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) {
      setTimeout(() => {
        activeProjectRef.current = activeProject;
      }, 500);
    }
  }, [activeProject]);

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(156, 163,175,0)" />
          <stop offset="50%" stopColor="rgba(156, 163,175,0.5)" />
          <stop offset="100%" stopColor="rgba(156, 163,175,0)" />
        </linearGradient>
      </defs>
      <g>
        {activeProject &&
          relevantCategoryIndices.map((_, index) => (
            <line
              key={`connection-${index}`}
              ref={(el) => {
                if (el) lineRefs.current[index] = el;
              }}
              className="stroke-[url(#lineGradient)]"
              strokeWidth="1"
              x1="0"
              y1="0"
              x2="0"
              y2="0"
            />
          ))}
      </g>
    </svg>
  );
}
