'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type MobileContextType = {
  isMobile: boolean;
  isLoaded: boolean;
};

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
  isLoaded: false,
});

export const useMobile = () => useContext(MobileContext);

export default function MobileProvider({
  children,
  breakpoint = 1280,
}: {
  children: React.ReactNode;
  breakpoint?: number;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log('isMobile:', isMobile);
  }, [isMobile]);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    const checkUserAgent = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileDevices =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      return mobileDevices.test(userAgent);
    };

    const initialCheck = () => {
      const isScreenWidthMobile = window.innerWidth < breakpoint;
      const isDeviceMobile = checkUserAgent();
      setIsMobile(isScreenWidthMobile || isDeviceMobile);
    };

    initialCheck();
    setIsLoaded(true);

    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [breakpoint]);

  return (
    <MobileContext.Provider value={{ isMobile, isLoaded }}>
      {children}
    </MobileContext.Provider>
  );
}
