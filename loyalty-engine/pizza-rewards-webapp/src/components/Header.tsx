import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bell } from 'lucide-react';

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
              <li><Link to="/customers" className="text-gray-600 hover:text-blue-600">Customers</Link></li>
              <li><Link to="/integrations" className="text-gray-600 hover:text-blue-600">Integrations</Link></li>
              <li><Link to="/analytics" className="text-gray-600 hover:text-blue-600">Analytics</Link></li>
              <li><Link to="/orders" className="text-gray-600 hover:text-blue-600">Orders</Link></li>
            </ul>
          </nav>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="ml-3 relative">
              <User className="h-8 w-8 rounded-full bg-gray-200 p-1" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;