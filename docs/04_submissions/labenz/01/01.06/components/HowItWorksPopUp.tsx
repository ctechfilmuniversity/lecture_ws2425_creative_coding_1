'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface HowItWorksPopupProps {
  children: React.ReactNode;
}

const HowItWorksPopup = ({ children }: HowItWorksPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const popupVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      y: 50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const steps = [
    'Get a link and share it with your friends',
    'Your friends anonymously answer questions about you',
    "On New Year's Eve at midnight, your questions will be unlocked on your dashboard",
  ];

  return (
    <>
      <span onClick={() => setIsOpen(true)}>{children}</span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-12 z-50 not-italic"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-orange-50 border border-black p-12 rounded-xl shadow-lg relative md:aspect-video flex flex-col justify-center md:h-96 "
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 right-0 translate-x-1/3 hover:translate-x-1/2  -translate-y-1/3 hover:-translate-y-1/2 transition-transform rounded-full bg-green-400 p-2 border border-black"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl md:text-2xl font-bold mb-6">
                How it works
              </h3>

              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <motion.li
                    key={index}
                    className="font-serif italic leading-tight text-xl md:text-3xl flex items-start gap-4"
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <span className="font-sans font-bold text-green-400 text-lg">
                      {index + 1}.
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HowItWorksPopup;
