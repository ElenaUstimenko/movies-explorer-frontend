import { useMediaQuery } from 'react-responsive';							
							
export function useScreen() {							
  const isDesktop = useMediaQuery({ minWidth: 1237 }); // 4 карточки в ряд, всего 12 + 4							
  const isTablet = useMediaQuery({ minWidth: 970, maxWidth: 1236 }); // 3 карточки в ряд, всего 9 + 3							
  const isSmallTablet = useMediaQuery({ minWidth: 729, maxWidth: 969 });// 2 карточки в ряд, всего 8 + 2							
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 728 }); // 1 карточка в ряд, всего 5 + 5							
							
  return { isDesktop, isTablet, isSmallTablet, isMobile };							
};							
