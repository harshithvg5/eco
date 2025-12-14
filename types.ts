export enum UserInterest {
  GAMES = 'Games',
  BOOKS = 'Books',
  TECH = 'Tech',
  SPORTS = 'Sports',
  ECO = 'Eco',
  DIY = 'DIY'
}

export interface UserProfile {
  name: string;
  ageGroup: string;
  interests: UserInterest[];
  gender?: string;
  locationPermission: boolean;
  ecoCoins: number;
  level: number;
  streak: number;
  carbonSaved: number; // in kg
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  ecoImpact: string;
  points: number;
  imageUrl: string;
  recommended?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'daily' | 'weekly';
}

export interface CivicIssue {
  id: string;
  type: string;
  status: 'Reported' | 'Verified' | 'Resolved';
  timestamp: Date;
  location: string;
}