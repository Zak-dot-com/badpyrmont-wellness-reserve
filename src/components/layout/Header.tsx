
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="bg-hotel-primary text-white">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Grand Hotel Badpyrmont
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-hotel-accent transition">Home</Link>
            <Link to="/booking" className="hover:text-hotel-accent transition">Book Wellness</Link>
            <Link to="#" className="hover:text-hotel-accent transition">Packages</Link>
            <Link to="#" className="hover:text-hotel-accent transition">About</Link>
            <Link to="#" className="hover:text-hotel-accent transition">Contact</Link>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hotel-primary">
              Sign In
            </Button>
            <Button variant="outline" className="bg-hotel-accent text-hotel-primary border-hotel-accent hover:bg-hotel-accent/90">
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
