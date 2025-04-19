
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ShoppingBag, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import MegaMenu from './MegaMenu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const languageOptions = [
  { label: 'EN', code: 'en' },
  { label: 'DE', code: 'de' },
  { label: 'FR', code: 'fr' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  
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
    <>
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
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
              <div className="flex items-center">
                <Link to="/" className="bg-white p-3 flex items-center">
                  <motion.img
                    src="/lovable-uploads/83754743-c943-4cb3-b419-3d34b82cb22b.png"
                    alt="Grand Hotel Bad Pyrmont"
                    className="h-[250px] w-auto object-contain"
                    variants={logoVariants}
                    animate="animate"
                  />
                  <span className="ml-4 text-lg font-bold text-black">by STEINBERGER</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-6">
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
                
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
                
                <Button 
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-none px-6"
                  onClick={() => setIsMegaMenuOpen(true)}
                >
                  MENU
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMegaMenuOpen && (
          <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
