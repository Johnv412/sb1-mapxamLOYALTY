import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

interface GiftCard {
  id: number;
  code: string;
  amount: number;
  balance: number;
}

const GiftCards: React.FC = () => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const fetchGiftCards = async () => {
    try {
      const response = await fetch('/wp-json/loyalty-engine/v1/gift-cards');
      if (!response.ok) {
        throw new Error('Failed to fetch gift cards');
      }
      const data = await response.json();
      setGiftCards(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching gift cards. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading gift cards...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Your Gift Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftCards.map((giftCard) => (
          <div key={giftCard.id} className="bg-green-100 p-4 rounded-lg">
            <Gift className="text-green-500 mb-2" size={32} />
            <h3 className="font-bold mb-2">Gift Card: {giftCard.code}</h3>
            <p className="mb-2">Original Amount: ${giftCard.amount}</p>
            <p className="font-semibold">Current Balance: ${giftCard.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftCards;