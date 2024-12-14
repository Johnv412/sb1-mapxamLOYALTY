export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePoints = (points: number): boolean => {
  return Number.isInteger(points) && points >= 0;
};

export const validateReward = (reward: {
  name: string;
  points: number;
  description: string;
}): string[] => {
  const errors: string[] = [];
  
  if (!reward.name?.trim()) {
    errors.push('Reward name is required');
  }
  
  if (!validatePoints(reward.points)) {
    errors.push('Points must be a positive integer');
  }
  
  if (!reward.description?.trim()) {
    errors.push('Description is required');
  }
  
  return errors;
};