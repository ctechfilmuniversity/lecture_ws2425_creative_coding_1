'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import HowItWorksPopup from './HowItWorksPopUp';
import Logo from './Logo';

const NavBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <nav className="bg-orange-100 border-b border-black">
      <div className="py-3 px-4 md:px-12">
        <div className="flex justify-between items-center">
          <Link
            href={'/'}
            className="font-bold font-sans italic hover:-translate-y-1 hover:-translate-x-1 transition-transform text-green-500"
          >
            <Logo className="w-48 md:w-80" />
          </Link>
          <div className="hidden md:flex gap-6">
            <HowItWorksPopup>
              <button className="font-sans text-base font-bold hover:-translate-y-1 hover:-translate-x-1 transition-transform">
                How it works
              </button>
            </HowItWorksPopup>
            <Link
              href="mailto:contact@yearly-dearly.com"
              className="font-sans text-base font-bold hover:-translate-y-1 hover:-translate-x-1 transition-transform"
            >
              Contact
            </Link>
          </div>
          <button
            className="md:hidden p-2 hover:bg-orange-200 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-4">
                <HowItWorksPopup>
                  <button className="block font-sans text-sm font-bold hover:translate-x-2 transition-transform">
                    How it works
                  </button>
                </HowItWorksPopup>
                <Link
                  href="mailto:contact@yearly-dearly.com"
                  className="block font-sans text-sm font-bold hover:translate-x-2 transition-transform"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
