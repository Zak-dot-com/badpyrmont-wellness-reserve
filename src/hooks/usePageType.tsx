
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * Hook to detect the current page type and provide relevant layout information
 * @returns Object with page type information and layout values
 */
export function usePageType() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  
  const isHomePage = location.pathname === '/';
  
  // Calculate proper header spacing based on device size
  const getHeaderSpacing = () => {
    if (isMobile) {
      return isHomePage ? 'pt-24' : 'pt-32';
    } else if (isTablet) {
      return isHomePage ? 'pt-28' : 'pt-36';
    } else {
      return isHomePage ? 'pt-32' : 'pt-40';
    }
  };
  
  return {
    isHomePage,
    topPadding: getHeaderSpacing(),
    // Additional metadata about the current page that might be useful
    currentPath: location.pathname
  };
}
