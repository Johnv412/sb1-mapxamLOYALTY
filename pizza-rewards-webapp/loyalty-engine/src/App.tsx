import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Rewards from './components/Rewards';
import GiftCards from './components/GiftCards';
import CustomerProfile from './components/CustomerProfile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/profile" element={<CustomerProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;