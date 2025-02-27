'use client';
import CanvasBackground from '@/components/CanvasBackground';
import Categories from '@/components/Categories';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import MobileProjects from '@/components/mobile/Projects';
import { categories, projects } from '@/lib/data';
import { Project } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [currentHoverProject, setCurrentHoverProject] =
    useState<Project | null>(null);
  const router = useRouter();

  interface PointerDownEvent extends React.PointerEvent<HTMLDivElement> {
    target: EventTarget & HTMLElement;
  }

  const handlePointerDown = (e: PointerDownEvent) => {
    if (
      e.target.closest('a') ||
      e.target.closest('[role="button"]') ||
      e.target.closest('.cursor-pointer')
    ) {
      return;
    }
    setIsDragging(true);
  };

  const onNaviagtion = (project: Project) => {
    setOpacity(0);
    router.prefetch(`/projects/${project.slug}`);

    setTimeout(() => {
      router.push(`/projects/${project.slug}`, {});
    }, 500);
  };

  useEffect(() => {
    setOpacity(0);
    requestAnimationFrame(() => {
      setOpacity(1);
    });
  }, []);

  return (
    <div
      className={`xl:h-full font-[family-name:var(--font-funnel-display)] w-full transition-opacity duration-500 py-12 xl:py-0`}
      style={{ opacity }}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setIsDragging(false)}
    >
      <Navbar
        className={`transition-all duration-500 ${
          currentHoverProject !== null ? 'blur-md' : 'blur-0'
        }`}
      />
      <main className="xl:select-none xl:cursor-grab xl:active:cursor-grabbing w-full xl:h-full xl:absolute xl:inset-0 xl:overflow-hidden">
        <h1 className="font-display font-light text-3xl md:text-4xl xl:hidden mt-12 px-4 xl:px-0">
          I like to create
          <br /> motion, design and code
          <br />
          that elevate each other
        </h1>
        <MobileProjects projects={projects} categories={categories} />

        <CanvasBackground currentProject={currentHoverProject} />
        <Projects
          isDragging={isDragging}
          setCurrentHoverProject={setCurrentHoverProject}
          projects={projects}
          onNavigation={onNaviagtion}
        />
        <Categories
          categories={categories}
          activeProject={currentHoverProject}
        />
      </main>
      <Hero
        className={`transition-all duration-500 ${
          currentHoverProject !== null ? 'blur-md' : 'blur-0'
        }`}
      />
    </div>
  );
}
