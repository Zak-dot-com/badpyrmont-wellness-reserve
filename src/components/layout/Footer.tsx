
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Grand Hotel Badpyrmont</h3>
            <p className="text-gray-400">
              Experience the ultimate wellness retreat at our luxury hotel and spa.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-white transition">Book Wellness</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Packages</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Wellness Services</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Spa Treatments</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Fitness Center</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Nutrition Planning</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Wellness Packages</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Group Activities</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p>Brunnenstraße 34</p>
              <p>31812 Bad Pyrmont, Germany</p>
              <p className="mt-3">Email: info@badpyrmont-wellness.com</p>
              <p>Phone: +49 5281 12345</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Grand Hotel Badpyrmont. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
