import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

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
          {/* Logo replaced with text */}
          <Link to="/" className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">Grand Hotel</h1>
            <h2 className="text-xl text-gray-600 -mt-1">Badpyrmont</h2>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={cn("text-sm font-medium transition-colors hover:text-amber-700", isActive(link.path) ? "text-amber-700" : "text-gray-600")}>
                {link.name}
              </Link>)}
            
            {user ? <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-amber-700" onClick={() => navigate('/dashboard')}>
                <User size={16} />
                Dashboard
              </Button> : <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:text-amber-700" onClick={() => navigate('/auth')}>
                <User size={16} />
                Login
              </Button>}
            
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
                
                {user ? <Link to="/dashboard" className="text-lg font-medium text-gray-600 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <User size={18} />
                    Dashboard
                  </Link> : <Link to="/auth" className="text-lg font-medium text-gray-600 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <User size={18} />
                    Login
                  </Link>}
                
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
