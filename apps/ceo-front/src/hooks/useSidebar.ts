'use client';

import { useState, useEffect } from 'react';

import { ScreenMode } from '../types/layout';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenMode, setScreenMode] = useState<ScreenMode>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreenMode('mobile');
      } else if (width < 1024) {
        setScreenMode('tablet');
      } else {
        setScreenMode('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return {
    isOpen,
    screenMode,
    isMobile: screenMode === 'mobile',
    isTablet: screenMode === 'tablet',
    isDesktop: screenMode === 'desktop',
    toggleSidebar,
    closeSidebar,
  };
};
