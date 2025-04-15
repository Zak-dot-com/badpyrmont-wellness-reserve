
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Award, Clock, User, Gift } from 'lucide-react';

const DashboardNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Rewards', path: '/rewards', icon: <Gift className="h-5 w-5" /> },
    { name: 'Activity', path: '/activity', icon: <Clock className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-4 p-1 bg-white rounded-lg shadow-sm">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
            location.pathname === item.path
              ? "bg-amber-100 text-amber-900 font-medium"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          )}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default DashboardNav;
