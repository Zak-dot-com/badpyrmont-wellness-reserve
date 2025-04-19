
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
    if (isHomePage) {
      return ''; // No padding needed for home page as hero takes full height
    }
    
    if (isMobile) {
      return 'pt-16'; // Mobile header is smaller
    } else if (isTablet) {
      return 'pt-28';
    } else {
      return 'pt-28'; // Desktop includes main header + secondary nav
    }
  };
  
  return {
    isHomePage,
    topPadding: getHeaderSpacing(),
    currentPath: location.pathname
  };
}
