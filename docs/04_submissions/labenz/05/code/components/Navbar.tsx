import Link from 'next/link';
import React from 'react';
import Obfuscate from 'react-obfuscate';
export interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div
      className={`xl:absolute z-20 top-4 left-8 right-8 px-4 xl:px-0 flex justify-between ${
        className || ''
      }`}
    >
      <Link href="/">
        <h1 className="text-lg font-display">Gorm Labenz</h1>
      </Link>

      <div className="text-right max-w-lg flex flex-col font-display">
        <div className="flex gap-6 justify-end">
          <Link
            href="/impress"
            className="hover:underline uppercase text-inherit text-sm font-bold hidden xl:block"
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

export default Navbar;
