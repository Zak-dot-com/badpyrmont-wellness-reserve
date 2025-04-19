import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  Mail,
  X,
  ChevronDown,
  LogIn 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import BookingSummary from '@/components/booking/BookingSummary';

const languageOptions = [
  { label: 'EN', code: 'en', flag: '🇺🇸' },
  { label: 'DE', code: 'de', flag: '🇩🇪' },
  { label: 'ES', code: 'es', flag: '🇪🇸' },
  { label: 'FR', code: 'fr', flag: '🇫🇷' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languageOptions[0]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    if (searchInputRef.current) {
      console.log("Search query:", searchInputRef.current.value);
      // Here you would typically navigate to search results page
      // navigate(`/search?q=${searchInputRef.current.value}`);
      setIsSearchOpen(false);
    }
  };

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0
    },
    hidden: {
      opacity: 0,
      y: -25
    }
  };

  const logoVariants = {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header 
      initial="hidden" 
      animate="visible" 
      variants={headerVariants} 
      transition={{ duration: 0.5 }} 
      className={cn("fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500", 
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      )}
    >
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            <div className="flex-1" />
            
            <div className="flex items-center space-x-4 justify-end flex-1">
              {isSearchOpen ? (
                <motion.form 
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  className="flex items-center"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="w-full h-8 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="ml-1 rounded-full" 
                    onClick={handleSearchToggle}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.form>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-black font-light flex items-center transition-transform duration-200 hover:scale-110"
                      >
                        <span className="mr-1 text-xs">{currentLanguage.flag}</span>
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[5rem]">
                      {languageOptions.map(option => (
                        <DropdownMenuItem 
                          key={option.code} 
                          className="flex items-center justify-between" 
                          onClick={() => setCurrentLanguage(option)}
                        >
                          <span className="text-xs">{option.flag}</span>
                          <span className="ml-2">{option.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full group transition-transform duration-200 hover:scale-110 relative"
                    onClick={handleSearchToggle}
                  >
                    <Search className="h-5 w-5" />
                    <span className="absolute -bottom-5 text-xs bg-[#F97316] px-2 py-0.5 rounded text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Search</span>
                  </Button>

                  <Link to="/contact">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full group transition-transform duration-200 hover:scale-110 relative"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="absolute -bottom-5 text-xs bg-[#F97316] px-2 py-0.5 rounded text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Contact</span>
                    </Button>
                  </Link>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full group transition-transform duration-200 hover:scale-110 relative"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -bottom-5 text-xs bg-[#F97316] px-2 py-0.5 rounded text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Cart</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 max-h-[85vh]" align="end">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-medium">Your Booking</h3>
                      </div>
                      <ScrollArea className="h-[calc(85vh-180px)]">
                        <div className="p-4">
                          <BookingSummary />
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t border-gray-100 space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                          onClick={() => navigate('/booking')}
                        >
                          Complete Booking
                        </Button>
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => navigate('/booking?step=checkout')}
                        >
                          Checkout
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Link to="/auth">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full group transition-transform duration-200 hover:scale-110 relative"
                    >
                      <LogIn className="h-5 w-5" />
                      <span className="absolute -bottom-5 text-xs bg-[#F97316] px-2 py-0.5 rounded text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Login</span>
                    </Button>
                  </Link>
                </>
              )}
              
              <div className="hidden md:block">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-6">
                      MENU
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-1/2 bg-slate-900 text-white p-0">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center p-6 border-b border-slate-800">
                        <span className="text-xl font-light">MENU</span>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-white">
                            CLOSE
                          </Button>
                        </SheetTrigger>
                      </div>
                      <div className="flex flex-col p-8 gap-6">
                        <Link to="/" className="text-2xl font-light">CONCEPT</Link>
                        <Link to="/health-guide" className="text-2xl font-light">HEALTH GUIDE</Link>
                        <Link to="/packages" className="text-2xl font-light">PACKAGES</Link>
                        <Link to="/locations" className="text-2xl font-light">CONTACT</Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
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
                      <Button variant="ghost" size="sm" className="text-white" onClick={() => setIsMenuOpen(false)}>
                        CLOSE
                      </Button>
                    </div>
                    <div className="flex flex-col p-8 gap-6">
                      <Link to="/" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>CONCEPT</Link>
                      <Link to="/health-guide" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>HEALTH GUIDE</Link>
                      <Link to="/packages" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>PACKAGES</Link>
                      <Link to="/locations" className="text-2xl font-light" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="absolute left-5 top-0 bg-white">
              <Link to="/" className="block">
                <motion.img 
                  src="/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png" 
                  alt="Grand Hotel Bad Pyrmont" 
                  variants={logoVariants} 
                  animate="animate" 
                  className="h-[144px] w-auto object-contain" 
                  style={{ 
                    maxHeight: '144px', 
                    padding: '3px 0' 
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block bg-[#0b1426] text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-end h-10">
            <div className="flex space-x-8 items-center">
              <Link to="/" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Concept</Link>
              <Link to="/health-guide" className="text-sm font-light uppercase tracking-wide hover:opacity-80">Health Guide</Link>
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
