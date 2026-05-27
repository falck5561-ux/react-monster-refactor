import { useState, useEffect } from 'react';

export function useBrowserInfo() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleOnline = () => setOnline(navigator.onLine);

    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOnline);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOnline);
    };
  }, []);

  return { windowWidth, online };
}