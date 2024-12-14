import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: (window as any).pizzaRewardsSettings?.apiUrl || '/wp-json/pizza-rewards/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': (window as any).pizzaRewardsSettings?.nonce,
  },
});

export interface Reward {
  id: string;
  storeName: string;
  name: string;
  description: string;
  points: number;
  quota: number;
  validity: string;
  neverExpire: boolean;
  expirationDate?: string;
}

export interface GiftCard {
  id: string;
  storeName: string;
  name: string;
  description: string;
  currency: string;
  type: 'paid' | 'free';
  neverExpire: boolean;
  expirationDate?: string;
  quota: number;
  validity: string;
}

export const getRewards = async (): Promise<Reward[]> => {
  try {
    const response = await api.get('/rewards');
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const createReward = async (reward: Omit<Reward, 'id'>): Promise<Reward> => {
  try {
    const response = await api.post('/rewards', reward);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const updateReward = async (reward: Reward): Promise<Reward> => {
  try {
    const response = await api.put(`/rewards/${reward.id}`, reward);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const deleteReward = async (id: string): Promise<void> => {
  try {
    await api.delete(`/rewards/${id}`);
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getGiftCards = async (): Promise<GiftCard[]> => {
  try {
    const response = await api.get('/giftcards');
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

// Add other gift card functions (create, update, delete) here

const handleApiError = (error: AxiosError): Error => {
  if (error.response) {
    return new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
  }
  return error;
};