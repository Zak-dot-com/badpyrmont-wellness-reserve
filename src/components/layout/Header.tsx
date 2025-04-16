
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

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

  const navLinks = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Book Room',
      path: '/book-room'
    },
    {
      name: 'Wellness Packages',
      path: '/booking?bookingType=package'
    },
    {
      name: 'Event Spaces',
      path: '/booking?bookingType=event'
    }
  ];

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png" 
              alt="Grand Hotel Badpyrmont" 
              className="h-16 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={cn("text-sm font-medium transition-colors hover:text-amber-700", isActive(link.path) ? "text-amber-700" : "text-gray-600")}>
                {link.name}
              </Link>)}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-amber-700">
                    <User size={16} />
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Loyalty Program</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/rewards')}>
                    Rewards
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/activity')}>
                    Points Activity
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    await supabase.auth.signOut();
                    navigate('/');
                  }}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-amber-700" onClick={() => navigate('/auth')}>
                <User size={16} />
                Login
              </Button>
            )}
            
            <Link to="/booking">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                Book Now
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw]">
              <div className="flex flex-col gap-6 p-4">
                {navLinks.map(link => <Link key={link.name} to={link.path} className={cn("text-lg font-medium", isActive(link.path) ? "text-amber-700" : "text-gray-600")} onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </Link>)}
                
                {user ? (
                  <>
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Gift size={18} />
                        Loyalty Program
                      </h3>
                      <div className="flex flex-col gap-3 pl-6">
                        <Link to="/dashboard" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
                          Dashboard
                        </Link>
                        <Link to="/rewards" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
                          Rewards
                        </Link>
                        <Link to="/activity" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
                          Points Activity
                        </Link>
                        <Link to="/profile" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
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
                  <Link to="/auth" className="text-lg font-medium text-gray-600 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <User size={18} />
                    Login
                  </Link>
                )}
                
                <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 mt-4">
                    Book Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
