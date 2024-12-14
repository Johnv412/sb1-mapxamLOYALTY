import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  // Mock data for the chart
  const data = [
    { name: 'Jan', purchases: 4000, points: 2400, rewards: 2400 },
    { name: 'Feb', purchases: 3000, points: 1398, rewards: 2210 },
    { name: 'Mar', purchases: 2000, points: 9800, rewards: 2290 },
    { name: 'Apr', purchases: 2780, points: 3908, rewards: 2000 },
    { name: 'May', purchases: 1890, points: 4800, rewards: 2181 },
    { name: 'Jun', purchases: 2390, points: 3800, rewards: 2500 },
    { name: 'Jul', purchases: 3490, points: 4300, rewards: 2100 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Overall Customer Engagement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="purchases" fill="#8884d8" />
            <Bar dataKey="points" fill="#82ca9d" />
            <Bar dataKey="rewards" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Total Customers</h4>
          <p className="text-2xl">1,234</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Points Earned (This Month)</h4>
          <p className="text-2xl">45,678</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Rewards Redeemed</h4>
          <p className="text-2xl">789</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;