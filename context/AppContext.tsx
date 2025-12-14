import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserInterest } from '../types';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: (details: Partial<UserProfile>) => void;
  addEcoCoins: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USER: UserProfile = {
  name: "Eco Warrior",
  ageGroup: "",
  interests: [],
  locationPermission: false,
  ecoCoins: 0,
  level: 1,
  streak: 0,
  carbonSaved: 0
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate persistent login for demo if needed, but starting fresh is better for auth flow showcase
  
  const login = (email: string) => {
    setIsAuthenticated(true);
    // In a real app, fetch user data here
    setUser({ ...INITIAL_USER, name: email.split('@')[0] || 'User' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const completeOnboarding = (details: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...details });
    }
  };

  const addEcoCoins = (amount: number) => {
    if (user) {
      setUser(prev => prev ? ({ ...prev, ecoCoins: prev.ecoCoins + amount }) : null);
    }
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile, completeOnboarding, addEcoCoins }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};