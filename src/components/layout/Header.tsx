
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Room', path: '/book-room' },
    { name: 'Wellness Packages', path: '/booking?bookingType=package' },
    { name: 'Event Spaces', path: '/booking?bookingType=event' },
  ];
  
  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-amber-800">Wellness</span>
            <span className="text-xl font-light text-amber-600">Retreat</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-700",
                  isActive(link.path) ? "text-amber-700" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
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
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-lg font-medium",
                      isActive(link.path) ? "text-amber-700" : "text-gray-600"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
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
