
import { useLocation } from 'react-router-dom';

/**
 * Hook to detect the current page type and provide relevant layout information
 * @returns Object with page type information
 */
export function usePageType() {
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  // Here we can add additional page type detection if needed in the future
  
  return {
    isHomePage,
    // Apply top padding equal to header height to prevent content from being hidden
    topPadding: isHomePage ? 'pt-32' : 'pt-40'
  };
}
