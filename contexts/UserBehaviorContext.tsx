'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserBehaviorContextType {
  viewedProductIds: string[];
  viewedCategoryIds: string[];
  addViewedProduct: (id: string) => void;
  addViewedCategory: (id: string) => void;
  clearBehavior: () => void;
}

const UserBehaviorContext = createContext<UserBehaviorContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'userBehavior';

function getInitialBehavior() {
  if (typeof window === 'undefined') return { viewedProductIds: [], viewedCategoryIds: [] };
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { viewedProductIds: [], viewedCategoryIds: [] };
}

export const UserBehaviorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewedProductIds, setViewedProductIds] = useState<string[]>(() => getInitialBehavior().viewedProductIds);
  const [viewedCategoryIds, setViewedCategoryIds] = useState<string[]>(() => getInitialBehavior().viewedCategoryIds);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ viewedProductIds, viewedCategoryIds })
    );
  }, [viewedProductIds, viewedCategoryIds]);

  const addViewedProduct = (id: string) => {
    setViewedProductIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const addViewedCategory = (id: string) => {
    setViewedCategoryIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const clearBehavior = () => {
    setViewedProductIds([]);
    setViewedCategoryIds([]);
  };

  return (
    <UserBehaviorContext.Provider value={{ viewedProductIds, viewedCategoryIds, addViewedProduct, addViewedCategory, clearBehavior }}>
      {children}
    </UserBehaviorContext.Provider>
  );
};

export function useUserBehavior() {
  const ctx = useContext(UserBehaviorContext);
  if (!ctx) throw new Error('useUserBehavior must be used within UserBehaviorProvider');
  return ctx;
}
