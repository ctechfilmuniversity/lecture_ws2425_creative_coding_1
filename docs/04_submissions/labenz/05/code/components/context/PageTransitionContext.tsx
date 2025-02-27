'use client';
import { createContext, useContext, useState } from 'react';

type PageTransitionContextType = {
  shouldStartAnimation: boolean;
  setShouldStartAnimation: (value: boolean) => void;
};

const PageTransitionContext = createContext<PageTransitionContextType>({
  shouldStartAnimation: true,
  setShouldStartAnimation: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldStartAnimation, setShouldStartAnimation] =
    useState<boolean>(true);

  return (
    <PageTransitionContext.Provider
      value={{ shouldStartAnimation, setShouldStartAnimation }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}
