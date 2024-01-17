import { useMediaQuery } from 'react-responsive';	

import { 
  isDesktopMin,
  isTabletMin,
  isTabletMax,
  isSmallTabletMin,
  isSmallTabletMax,
  isMobileMin,
  isMobileMax,
 } from '../utils/constants.js';
							
export function useScreen() {							
  const isDesktop = useMediaQuery({ minWidth: isDesktopMin }); // 4 карточки в ряд, всего 12 + 4							
  const isTablet = useMediaQuery({ minWidth: isTabletMin, maxWidth: isTabletMax }); // 3 карточки в ряд, всего 12 + 3							
  const isSmallTablet = useMediaQuery({ minWidth: isSmallTabletMin, maxWidth: isSmallTabletMax });// 2 карточки в ряд, всего 8 + 2							
  const isMobile = useMediaQuery({ minWidth: isMobileMin, maxWidth: isMobileMax }); // 1 карточка в ряд, всего 5 + 5					
							
  return { isDesktop, isTablet, isSmallTablet, isMobile };							
};							
