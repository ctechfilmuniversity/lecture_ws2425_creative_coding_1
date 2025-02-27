'use client';
import { useMobile } from '@/components/context/MobileContext';
import ImageGallery from '@/components/mobile/ImageGallery';
import ProjectNavigation from '@/components/ProjectNaviagtion';
import { projects } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
const ProjectPage: NextPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const { slug } = params;
  const [opacity, setOpacity] = useState(0);

  const { isMobile } = useMobile();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  useEffect(() => {
    setOpacity(0);
    requestAnimationFrame(() => {
      setOpacity(1);
    });
  }, [pathname]);

  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <div
        className="xl:grid grid-cols-subgrid col-span-12 transition-opacity duration-500 mt-8 row-start-2 flex flex-col-reverse"
        style={{ opacity }}
      >
        <div className="col-span-4 flex flex-col mt-12 xl:mt-0 px-4 xl:px-0">
          <div>
            <h1 className="font-display text-4xl xl:text-6xl  font-light grid-cols-subgrid">
              {project.title}
            </h1>
            <div className="mt-4 xl:mt-6 flex space-x-2">
              <h2 className="font-display font-bold uppercase xl:leading-none text-sm">
                {project.data.year}
              </h2>

              <h3 className="font-display xl:leading-none text-sm uppercase font-light">
                {project.data.categories.join(' • ')}
              </h3>
            </div>
          </div>
          <p className="text-sm mt-6 xl:mt-12 font-sans whitespace-pre-wrap">
            {project.data.description}
          </p>
          {project.data.projectLink && (
            <Link
              href={project.data.projectLink.href}
              target="_blank"
              className="text-sm mt-12 font-sans underline uppercase font-bold text-blue-600"
            >
              {project.data.projectLink.text}
              <Image
                src="/icon/arrow_outward.svg"
                alt=""
                className="inline-block ml-2"
                width={18}
                height={18}
              />
            </Link>
          )}
        </div>
        <div className="col-span-7 col-start-6 relative grid-cols-subgrid xl:grid">
          {isMobile ? (
            <ImageGallery
              images={project.data.images}
              projectTitle={project.title}
            />
          ) : (
            <div className="col-span-7 w-full">
              <div className="relative w-full xl:aspect-[4/3] h-[50vh] items-center xl:h-auto flex xl:max-h-[600px]">
                <Image
                  id="image"
                  src={
                    project.data.images[currentImage].src || '/placeholder.svg'
                  }
                  alt={project.title}
                  className={`object-contain  ${
                    project.data.images[currentImage].src.includes('mockup')
                      ? 'px-4 xl:px-0'
                      : ''
                  } `}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={80}
                  priority
                  width={project.data.images[currentImage].size.width}
                  height={project.data.images[currentImage].size.height}
                />
                <label
                  htmlFor="image"
                  className={`font-sans absolute text-center -bottom-12 w-full left-1/2 -translate-x-1/2 text-gray-500 block text-sm `}
                >
                  {project.data.images[currentImage].description}
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <ProjectNavigation />
      <div className="col-span-7 xl:flex col-start-6 h-24 justify-center hidden space-x-2">
        {project.data.images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setCurrentImage(index)}
            className={`cursor-pointer p-2 ${
              currentImage === index ? 'outline outline-2 outline-primary' : ''
            }`}
          >
            <Image
              src={image.src || '/placeholder.svg'}
              alt={`${project.title} - Image ${index + 1}`}
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
              quality={80}
              className="object-fit object-center w-auto h-full"
              width={image.size.width}
              height={image.size.height}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default ProjectPage;
