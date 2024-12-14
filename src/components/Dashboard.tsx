import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Star, Share2, MessageSquare, ChevronRight } from 'lucide-react';

interface UserPoints {
  total: number;
  thisMonth: number;
  pendingPoints: number;
}

interface FeaturedReward {
  id: string;
  name: string;
  points: number;
  description: string;
  expiresIn: string;
}

const Dashboard: React.FC = () => {
  const [points, setPoints] = useState<UserPoints>({
    total: 0,
    thisMonth: 0,
    pendingPoints: 0
  });
  const [featuredRewards, setFeaturedRewards] = useState<FeaturedReward[]>([]);

  useEffect(() => {
    // Simulated data - replace with actual API calls
    setPoints({
      total: 1250,
      thisMonth: 450,
      pendingPoints: 75
    });

    setFeaturedRewards([
      {
        id: '1',
        name: 'Free Large Pizza',
        points: 500,
        description: 'Redeem for any large pizza of your choice',
        expiresIn: '7 days'
      },
      {
        id: '2',
        name: '2x Points Weekend',
        points: 0,
        description: 'Earn double points on all purchases this weekend',
        expiresIn: '3 days'
      }
    ]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Your Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Points</p>
            <p className="text-3xl font-bold text-blue-700">{points.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Earned This Month</p>
            <p className="text-3xl font-bold text-green-700">{points.thisMonth}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Pending Points</p>
            <p className="text-3xl font-bold text-yellow-700">{points.pendingPoints}</p>
          </div>
        </div>
      </div>

      {/* Featured Rewards */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Rewards</h2>
          <Link to="/rewards" className="text-blue-600 hover:text-blue-700 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredRewards.map(reward => (
            <div key={reward.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{reward.name}</h3>
                  <p className="text-gray-600">{reward.description}</p>
                </div>
                {reward.points > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                    {reward.points} points
                  </span>
                )}
              </div>
              <p className="text-sm text-red-600 mt-2">Expires in {reward.expiresIn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg hover:shadow-md transition-shadow">
          <Utensils className="text-blue-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Earn Points</h3>
          <p>Earn 1 point for every $1 spent on purchases</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg hover:shadow-md transition-shadow">
          <Star className="text-green-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Redeem Rewards</h3>
          <p>Use your points for discounts and free items</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg hover:shadow-md transition-shadow">
          <Share2 className="text-yellow-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Share & Earn</h3>
          <p>Get bonus points for sharing on social media</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg hover:shadow-md transition-shadow">
          <MessageSquare className="text-purple-500 mb-2" size={32} />
          <h3 className="font-bold mb-2">Leave Reviews</h3>
          <p>Earn points for leaving reviews on your orders</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;