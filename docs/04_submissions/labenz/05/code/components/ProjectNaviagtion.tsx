'use client';

import { projects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProjectNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const slug = pathname.split('/').pop();

  const getAdjacentProjects = (currentSlug: string) => {
    const currentIndex = projects.findIndex((p) => p.slug === currentSlug);

    if (currentIndex === -1) return null;

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;

    return {
      currentProject: projects[currentIndex],
      prevProject: projects[prevIndex],
      nextProject: projects[nextIndex],
    };
  };

  const projectData = getAdjacentProjects(slug || '');

  useEffect(() => {
    if (projectData) {
      router.prefetch(`/projects/${projectData.prevProject.slug}`);
      router.prefetch(`/projects/${projectData.nextProject.slug}`);
    }
  }, [router, projectData]);

  if (!projectData) {
    return null;
  }

  const { prevProject, nextProject } = projectData;

  return (
    <div className="flex px-4 xl:px-0 justify-between items-center col-span-2 col-start-1 mt-12 xl:mt-auto">
      <Link href={`/projects/${prevProject.slug}`}>
        <Image
          src="/icon/arrow_back_ios.svg"
          alt="Previous"
          width={18}
          height={18}
          className="w-auto h-auto"
        />
      </Link>
      <p className="text-sm font-bold uppercase font-sans leading-none">
        Projects
      </p>
      <Link href={`/projects/${nextProject.slug}`}>
        <Image
          src="/icon/arrow_forward_ios.svg"
          alt="Next"
          width={18}
          height={18}
          className="w-auto h-auto"
        />
      </Link>
    </div>
  );
}
