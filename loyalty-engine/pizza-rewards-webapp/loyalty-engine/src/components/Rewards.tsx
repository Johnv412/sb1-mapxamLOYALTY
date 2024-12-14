import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
}

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await fetch('/wp-json/loyalty-engine/v1/rewards');
      if (!response.ok) {
        throw new Error('Failed to fetch rewards');
      }
      const data = await response.json();
      setRewards(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching rewards. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading rewards...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Available Rewards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-blue-100 p-4 rounded-lg">
            <Star className="text-blue-500 mb-2" size={32} />
            <h3 className="font-bold mb-2">{reward.name}</h3>
            <p className="mb-2">{reward.description}</p>
            <p className="font-semibold">{reward.points} points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;