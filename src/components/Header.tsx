import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bell, Gift, Star } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            🍕 Pizza Rewards
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Rewards
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Link 
              to="/rewards" 
              className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="View Rewards"
            >
              <Star className="h-6 w-6" />
            </Link>
            <Link 
              to="/gift-cards" 
              className="p-2 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
              title="View Gift Cards"
            >
              <Gift className="h-6 w-6" />
            </Link>
            <button 
              className="p-2 rounded-full text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
              title="View Notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
            <Link 
              to="/profile" 
              className="p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              title="View Profile"
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;