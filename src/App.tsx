import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Rewards = React.lazy(() => import('./components/Rewards'));
const GiftCards = React.lazy(() => import('./components/GiftCards'));
const CustomerProfile = React.lazy(() => import('./components/CustomerProfile'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/gift-cards" element={<GiftCards />} />
              <Route path="/profile" element={<CustomerProfile />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;