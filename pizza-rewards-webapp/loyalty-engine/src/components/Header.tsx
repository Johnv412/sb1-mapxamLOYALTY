import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bell, Gift, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">LoyaltyEngine</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600">Dashboard</Link></li>
              <li><Link to="/rewards" className="text-gray-600 hover:text-blue-600">Rewards</Link></li>
              <li><Link to="/gift-cards" className="text-gray-600 hover:text-blue-600">Gift Cards</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link></li>
            </ul>
          </nav>
          <div className="flex items-center">
            <Link to="/rewards" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3">
              <span className="sr-only">View rewards</span>
              <Star className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link to="/gift-cards" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3">
              <span className="sr-only">View gift cards</span>
              <Gift className="h-6 w-6" aria-hidden="true" />
            </Link>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link to="/profile" className="ml-3 relative">
              <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;