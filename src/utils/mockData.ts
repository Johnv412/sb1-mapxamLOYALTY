import { Reward, GiftCard } from './api';

export const mockRewards: Reward[] = [
  {
    id: '1',
    storeName: 'Pizza Palace',
    name: 'Free Small Pizza',
    description: 'Get a free small pizza with any large pizza purchase',
    points: 100,
    quota: 50,
    validity: 'instant',
    neverExpire: false,
    expirationDate: '2023-12-31',
  },
  {
    id: '2',
    storeName: 'Pizza Palace',
    name: '20% Off Next Order',
    description: 'Get 20% off your next order',
    points: 200,
    quota: 100,
    validity: 'instant',
    neverExpire: true,
  },
  // Add more mock rewards as needed
];

export const mockGiftCards: GiftCard[] = [
  {
    id: '1',
    storeName: 'Pizza Palace',
    name: '$10 Gift Card',
    description: '$10 gift card for any purchase',
    currency: 'USD',
    type: 'paid',
    neverExpire: false,
    expirationDate: '2023-12-31',
    quota: 100,
    validity: 'instant',
  },
  {
    id: '2',
    storeName: 'Pizza Palace',
    name: '$25 Gift Card',
    description: '$25 gift card for any purchase',
    currency: 'USD',
    type: 'paid',
    neverExpire: true,
    quota: 50,
    validity: 'instant',
  },
  // Add more mock gift cards as needed
];