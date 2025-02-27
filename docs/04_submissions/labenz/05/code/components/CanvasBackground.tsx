'use client';
import { projects } from '@/lib/data';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useEnvironmentScene } from './context/EnvironmentSceneContext';

import { Position, Project } from '@/lib/types';
import { usePageTransition } from './context/PageTransitionContext';

const RECT_SIZE_WIDTH_WIDTH = 400;
const RECT_SIZE_WIDTH_HEIGHT = 300;
const TAIL_COUNT = 6;
const LERP_FACTOR = 0.2;
const MAX_SEGMENT_DISTANCE = 100;
const FADE_LERP_FACTOR = 0.05;
const INTRO_DURATION = 5000;

export interface CanvasBackgroundProps {
  currentProject: Project | null;
}

const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

const limitDistance = (
  p1: Position,
  p2: Position,
  maxDistance: number
): Position => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= maxDistance) {
    return p2;
  }

  const ratio = maxDistance / distance;
  return {
    x: p1.x + dx * ratio,
    y: p1.y + dy * ratio,
    z: p2.z,
  };
};

const CanvasBackground: FC<CanvasBackgroundProps> = ({ currentProject }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const environmentScene = useEnvironmentScene();
  const pageTransition = usePageTransition();
  const firstRenderRef = useRef(false);
  const currentProjectRef = useRef<Project | null>(currentProject);
  const [opacity, setOpacity] = useState(0);

  const projectPositionsRef = useRef<Position[]>(
    Array.from({ length: projects.length }, () => ({ x: 0, y: 0, z: 0 }))
  );

  const tailPositionsRef = useRef<Array<Array<Position>>>(
    Array.from({ length: projects.length }, () =>
      Array.from({ length: TAIL_COUNT }, () => ({ x: 0, y: 0, z: 0 }))
    )
  );

  const projectOpacitiesRef = useRef<Array<number>>(
    Array.from({ length: projects.length }, () => 1)
  );

  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  useEffect(() => {
    if (!environmentScene.scene) {
      return;
    }
    if (pageTransition.shouldStartAnimation) {
      environmentScene.scene.startAnimation({
        duration: INTRO_DURATION,
        rotation: Math.PI * 2,
        startScale: 0.4,
      });
      environmentScene.scene.addStartAnimationCompletedCallback(() => {
        pageTransition.setShouldStartAnimation(false);
      });
    }

    setOpacity(1);
  }, [environmentScene, pageTransition]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    projects.forEach((project, projectIndex) => {
      const tailPositions = tailPositionsRef.current[projectIndex];
      const projectOpacity = projectOpacitiesRef.current[projectIndex];

      for (let i = TAIL_COUNT - 1; i >= 0; i--) {
        const tailPos = tailPositions[i];
        const { x, y } = tailPos;

        const baseOpacity = 1 - i * (1 / TAIL_COUNT) * 0.5;
        const finalOpacity = baseOpacity * projectOpacity;
        const scale = 1 - i * 0.02;

        ctx.globalAlpha = finalOpacity;
        ctx.fillStyle = project.data.hex;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillRect(
          -RECT_SIZE_WIDTH_WIDTH / 2,
          -RECT_SIZE_WIDTH_HEIGHT / 2,
          RECT_SIZE_WIDTH_WIDTH,
          RECT_SIZE_WIDTH_HEIGHT
        );
        ctx.restore();
      }
    });

    ctx.globalAlpha = 1;
  }, []);

  const onAnimate = useCallback(
    (projectsPositions: Position[]) => {
      if (firstRenderRef.current) {
        updatePositionsWithAnimation(projectsPositions);
      } else {
        initializePositions(projectsPositions);
        firstRenderRef.current = true;
      }

      drawCanvas();
    },
    [drawCanvas]
  );

  const initializePositions = (projectsPositions: Position[]) => {
    projectsPositions.forEach((position, i) => {
      projectPositionsRef.current[i] = position;

      const tails = tailPositionsRef.current[i];
      for (let j = 0; j < TAIL_COUNT; j++) {
        tails[j] = { ...position };
      }

      const isHovered = currentProjectRef.current?.id === i;
      const targetOpacity = isHovered ? 0 : 1;
      projectOpacitiesRef.current[i] = targetOpacity;
    });
  };

  const updatePositionsWithAnimation = (projectsPositions: Position[]) => {
    projectsPositions.forEach((position, i) => {
      projectPositionsRef.current[i] = position;
      const tails = tailPositionsRef.current[i];

      tails[0] = { ...position };

      for (let j = 1; j < TAIL_COUNT; j++) {
        const tailLerpFactor = LERP_FACTOR / (j * 0.5 + 1);

        const lerpedPosition = {
          x: lerp(tails[j].x, tails[j - 1].x, tailLerpFactor),
          y: lerp(tails[j].y, tails[j - 1].y, tailLerpFactor),
          z: lerp(tails[j].z, tails[j - 1].z, tailLerpFactor),
        };

        const limitedPosition = limitDistance(
          tails[j - 1],
          lerpedPosition,
          MAX_SEGMENT_DISTANCE
        );

        tails[j] = limitedPosition;
      }

      const isHovered = currentProjectRef.current?.id === i;
      const targetOpacity = isHovered ? 0 : 1;
      const fadeFactor = isHovered
        ? FADE_LERP_FACTOR
        : FADE_LERP_FACTOR / TAIL_COUNT;

      projectOpacitiesRef.current[i] = lerp(
        projectOpacitiesRef.current[i],
        targetOpacity,
        fadeFactor
      );
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animationFrameId = animationFrameRef.current;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      drawCanvas();
    };

    projects.forEach((_, i) => {
      const currentPos = projectPositionsRef.current[i];
      tailPositionsRef.current[i] = Array.from({ length: TAIL_COUNT }, () => ({
        ...currentPos,
      }));
      projectOpacitiesRef.current[i] = 1;
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (environmentScene.scene) {
      environmentScene.scene.addAnimationCallback(onAnimate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (environmentScene.scene) {
        environmentScene.scene.removeAnimationCallback(onAnimate);
      }

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [environmentScene, onAnimate, drawCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute h-full w-full blur-[80px] saturate-150 z-10 transition-opacity pointer-events-none hidden xl:block`}
      style={{
        transitionDuration: pageTransition.shouldStartAnimation
          ? `${INTRO_DURATION}ms`
          : '0',
        opacity,
      }}
    />
  );
};

export default CanvasBackground;
