import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface CustomerProfile {
  id: number;
  name: string;
  email: string;
  points: number;
}

const CustomerProfile: React.FC = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomerProfile();
  }, []);

  const fetchCustomerProfile = async () => {
    try {
      const response = await fetch('/wp-json/loyalty-engine/v1/customer-profile');
      if (!response.ok) {
        throw new Error('Failed to fetch customer profile');
      }
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching customer profile. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="flex items-center mb-4">
        <User className="text-blue-500 mr-4" size={48} />
        <div>
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Loyalty Points</h4>
        <p className="text-2xl font-semibold">{profile.points} points</p>
      </div>
    </div>
  );
};

export default CustomerProfile;