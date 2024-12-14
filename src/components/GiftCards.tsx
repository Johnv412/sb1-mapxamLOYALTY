// ... existing imports

const GiftCards: React.FC = () => {
  // ... existing state declarations

  const fetchGiftCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedGiftCards = await getGiftCards();
      setGiftCards(fetchedGiftCards);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to fetch gift cards: ${errorMessage}. Please check your network connection and try again.`);
      console.error('Error fetching gift cards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same
};

export default GiftCards;