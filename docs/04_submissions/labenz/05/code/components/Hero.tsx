import Link from 'next/link';
import React from 'react';
import Obfuscate from 'react-obfuscate';

export interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div
      className={`xl:absolute bottom-4 left-8 right-8 z-10 flex xl:justify-between mt-12 xl:mt-0 ${
        className || ''
      }`}
    >
      <h1 className="font-display font-light text-4xl hidden xl:block">
        I like to create
        <br /> motion, design and code
        <br />
        that elevate each other
      </h1>

      <div className="font-display xl:text-right max-w-lg flex flex-col justify-between gap-6 px-4 xl:px-0">
        <p>
          Based in Berlin, I create visual experiences through creative
          development and animation. Outside of work, you&apos;ll find me doing
          water sports or tinkering with personal projects.
        </p>
        <div className="flex gap-6 xl:justify-end">
          <Link
            href="https://www.behance.net/gorm-labenz"
            className="text-inherit text-sm font-bold uppercase hover:underline"
            target="_blank"
          >
            Behance
          </Link>
          <Link
            href="https://www.instagram.com/la.benzzz"
            className="text-inherit text-sm font-bold uppercase hover:underline"
            target="_blank"
          >
            Instagram
          </Link>
          <Link
            href="https://patreon.com/labenz?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
            className="text-inherit text-sm font-bold uppercase hover:underline"
            target="_blank"
          >
            Patreon
          </Link>
        </div>

        <div className="flex gap-6 mt-12 xl:hidden">
          <Link
            href="/impress"
            className="hover:underline uppercase text-inherit text-sm font-bold"
          >
            Impress
          </Link>
          <p className="hover:underline uppercase text-inherit text-sm font-bold">
            <Obfuscate email="hi@labenz.io">Contact</Obfuscate>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
