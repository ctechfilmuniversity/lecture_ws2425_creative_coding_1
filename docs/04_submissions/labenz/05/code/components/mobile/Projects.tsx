import { categories } from '@/lib/data';
import { Category, Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import Tag from './Tag';

interface ProjectsProps {
  projects: Project[];
  categories: Category[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  return (
    <div className="xl:hidden mt-6">
      <div className="py-6 space-y-4">
        <div className="px-4  text-sm uppercase font-light text-gray-400">
          Projects
        </div>
        <div className="flex space-x-2 gap-y-2 scroll-mx-2 overflow-x-scroll px-4 scrollbar-hidden">
          <Tag
            isActive={!activeCategory}
            onClick={() => setActiveCategory(null)}
            text="All"
          />
          {categories.map((category, index) => (
            <Tag
              key={`category-${index}`}
              isActive={category === activeCategory}
              onClick={() => setActiveCategory(category)}
              text={category.title}
            />
          ))}
        </div>
      </div>
      <ul>
        {projects.map((project, index) => (
          <AnimateHeight
            key={`project-${index}`}
            duration={600}
            height={
              activeCategory &&
              !project.data.categories.includes(activeCategory.title)
                ? 0
                : 'auto'
            }
          >
            <Link href={`/projects/${project.slug}`} key={`project-${index}`}>
              <li className="w-full h-40 overflow-hidden flex justify-center relative">
                <Image
                  src={project.data.thumb.src}
                  width={project.data.thumb.size.width}
                  height={project.data.thumb.size.height}
                  alt={project.title}
                  className=" object-cover w-full blur-xl"
                />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h2>{project.title}</h2>
                  <div className="flex space-x-2">
                    <h2 className="font-display leading-none text-sm uppercase font-light">
                      {project.data.year}
                    </h2>
                  </div>
                </div>
              </li>
            </Link>
          </AnimateHeight>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
