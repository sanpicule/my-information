import { useState, useEffect } from 'react';

export const useIsHoverable = () => {
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    // Media query to check for hover capability
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    
    // Set the initial state
    setIsHoverable(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsHoverable(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isHoverable;
};
