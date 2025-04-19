
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ShoppingBag, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const languageOptions = [
  { label: 'EN', code: 'en' },
  { label: 'DE', code: 'de' },
  { label: 'FR', code: 'fr' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect for better visual appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      )}
    >
      {/* Top navigation bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold tracking-wide uppercase text-black">
                LANSERHOF.
                <span className="text-xs ml-3 font-light uppercase tracking-wide hidden md:inline-block">WORLD'S BEST LONGEVITY CLINIC</span>
              </Link>
            </div>
            
            {/* Right side elements */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-black font-light">
                    {currentLanguage} <span className="ml-1">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[5rem]">
                  {languageOptions.map(option => (
                    <DropdownMenuItem 
                      key={option.code}
                      className="text-center"
                      onClick={() => setCurrentLanguage(option.label)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Action Icons */}
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              
              {/* Menu Button - Desktop */}
              <div className="hidden md:block">
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-6">
                  MENU
                </Button>
              </div>
              
              {/* Menu Button - Mobile */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-slate-900 text-white p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-6 border-b border-slate-800">
                      <span className="text-xl font-light">MENU</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-white" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        CLOSE
                      </Button>
                    </div>
                    <div className="flex flex-col p-8 gap-6">
                      <Link to="/" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>CONCEPT</Link>
                      <Link to="/health-guide" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>HEALTH GUIDE</Link>
                      <Link to="/packages" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>PACKAGES</Link>
                      <Link to="/locations" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>LOCATIONS</Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation - navy blue bar */}
      <div className="hidden md:block bg-[#0b1426] text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Left menu items */}
            <div className="flex space-x-8">
              <Link to="/" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Concept</Link>
              <Link to="/health-guide" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Health Guide</Link>
            </div>
            
            {/* Right menu items */}
            <div className="flex space-x-8">
              <Link to="/locations/lans" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Lans</Link>
              <Link to="/locations/tegernsee" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Tegernsee</Link>
              <Link to="/locations/sylt" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Sylt</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
