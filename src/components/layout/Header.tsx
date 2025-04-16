
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Gift, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const languageOptions = [
  { label: 'English', code: 'en' },
  { label: 'Deutsch', code: 'de' },
  { label: 'Français', code: 'fr' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect for better visual appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Check for existing session
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Accommodation',
    path: '/book-room'
  }, {
    name: 'Wellness',
    path: '/booking?bookingType=package'
  }, {
    name: 'Events',
    path: '/booking?bookingType=event'
  }];

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
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <motion.img 
              src="/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png" 
              alt="Grand Hotel Badpyrmont" 
              className={cn(
                "h-auto w-auto transition-all duration-500",
                isScrolled ? "h-12 md:h-16" : "h-16 md:h-24"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-10 items-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <Link 
                  to={link.path} 
                  className={cn(
                    "text-sm uppercase tracking-wider font-light transition-colors hover:text-lanserhof-accent", 
                    isActive(link.path) 
                      ? "text-lanserhof-accent" 
                      : isScrolled ? "text-lanserhof-primary" : "text-white"
                  )}
                >
                  <span className="relative overflow-hidden inline-block">
                    {link.name}
                    <span className={cn(
                      "absolute left-0 bottom-0 w-full h-px bg-current transform scale-x-0 transition-transform duration-300 origin-right",
                      isActive(link.path) && "scale-x-100 origin-left"
                    )}></span>
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "flex items-center gap-1 hover:bg-transparent", 
                      isScrolled ? "text-lanserhof-primary" : "text-white"
                    )}
                  >
                    <Globe size={16} />
                    <span className="uppercase text-xs font-light tracking-wider">
                      {currentLanguage}
                    </span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md min-w-[8rem]">
                  {languageOptions.map(option => (
                    <DropdownMenuItem 
                      key={option.code}
                      className="text-lanserhof-primary hover:text-lanserhof-accent uppercase text-xs tracking-wider py-2"
                      onClick={() => setCurrentLanguage(option.code)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
            
            {/* User Account */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "flex items-center gap-2 hover:bg-transparent", 
                        isScrolled ? "text-lanserhof-primary" : "text-white"
                      )}
                    >
                      <User size={16} />
                      <span className="text-xs uppercase tracking-wider font-light">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md min-w-[12rem]">
                    <DropdownMenuLabel className="font-normal text-xs uppercase tracking-wider">Loyalty Program</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-lanserhof-beige/30" />
                    <DropdownMenuItem 
                      className="text-lanserhof-primary hover:text-lanserhof-accent py-2"
                      onClick={() => navigate('/dashboard')}
                    >
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-lanserhof-primary hover:text-lanserhof-accent py-2"
                      onClick={() => navigate('/rewards')}
                    >
                      Rewards
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-lanserhof-primary hover:text-lanserhof-accent py-2"
                      onClick={() => navigate('/profile')}
                    >
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-lanserhof-beige/30" />
                    <DropdownMenuItem 
                      className="text-lanserhof-primary hover:text-lanserhof-accent py-2"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        navigate('/');
                      }}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "flex items-center gap-2 hover:bg-transparent", 
                    isScrolled ? "text-lanserhof-primary" : "text-white"
                  )}
                  onClick={() => navigate('/auth')}
                >
                  <User size={16} />
                  <span className="text-xs uppercase tracking-wider font-light">Login</span>
                </Button>
              )}
            </motion.div>
            
            {/* Book Now Button */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link to="/booking">
                <Button 
                  size="sm" 
                  variant={isScrolled ? "default" : "outline"}
                  className={cn(
                    "transition-all duration-300",
                    !isScrolled && "border-white text-white hover:bg-white hover:text-lanserhof-primary"
                  )}
                >
                  <span className="uppercase text-xs tracking-wider">Book Now</span>
                </Button>
              </Link>
            </motion.div>
          </nav>
          
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "lg:hidden transition-colors",
                  isScrolled ? "text-lanserhof-primary" : "text-white"
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] bg-lanserhof-light pt-20">
              <div className="flex flex-col gap-8 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {languageOptions.map(option => (
                      <button 
                        key={option.code}
                        className={cn(
                          "text-xs uppercase tracking-wider py-1 px-3",
                          currentLanguage === option.code 
                            ? "text-lanserhof-accent border-b border-lanserhof-accent" 
                            : "text-lanserhof-gray"
                        )}
                        onClick={() => setCurrentLanguage(option.code)}
                      >
                        {option.code}
                      </button>
                    ))}
                  </div>
                </div>
                
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={cn(
                      "text-lg font-serif font-light tracking-wide", 
                      isActive(link.path) ? "text-lanserhof-accent" : "text-lanserhof-primary"
                    )} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <div className="pt-6 border-t border-lanserhof-beige">
                      <h3 className="font-medium text-lanserhof-accent uppercase text-sm tracking-wider mb-4">
                        Account
                      </h3>
                      <div className="flex flex-col gap-4 pl-4">
                        <Link 
                          to="/dashboard" 
                          className="text-lanserhof-primary text-base font-light" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/rewards" 
                          className="text-lanserhof-primary text-base font-light" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Rewards
                        </Link>
                        <Link 
                          to="/profile" 
                          className="text-lanserhof-primary text-base font-light" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile Settings
                        </Link>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="justify-start" 
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setIsMenuOpen(false);
                        navigate('/');
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    className="text-lg font-light text-lanserhof-primary flex items-center gap-2" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    Login
                  </Link>
                )}
                
                <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="mt-4">
                  <Button className="w-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
