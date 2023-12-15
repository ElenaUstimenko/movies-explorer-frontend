import { useMediaQuery } from 'react-responsive';

export function useScreen() {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 425, maxWidth: 768 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 425 });

  return { isDesktop, isTablet, isMobile };
};