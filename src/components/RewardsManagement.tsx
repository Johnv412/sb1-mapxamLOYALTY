// ... existing imports

const RewardsManagement: React.FC = () => {
  // ... existing state declarations

  const fetchRewards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedRewards = await getRewards();
      setRewards(fetchedRewards);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to fetch rewards: ${errorMessage}. Please check your network connection and try again.`);
      console.error('Error fetching rewards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same
};

export default RewardsManagement;