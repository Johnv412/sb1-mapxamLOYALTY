import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RewardsManagement from './components/RewardsManagement';
import GiftCards from './components/GiftCards';
import Customers from './components/Customers';
import Integrations from './components/Integrations';
import Analytics from './components/Analytics';
import Orders from './components/Orders';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rewards" element={<RewardsManagement />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;