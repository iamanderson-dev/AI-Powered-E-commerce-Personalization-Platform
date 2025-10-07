'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/types';

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: { items: WishlistItem[] } };

interface WishlistContextType {
  state: WishlistState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload;
      
      // Check if item already exists
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return state; // Don't add duplicate
      }

      const newItem: WishlistItem = {
        id: `wishlist-${product.id}-${Date.now()}`,
        product,
        addedAt: new Date(),
      };

      const newItems = [...state.items, newItem];

      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);

      return {
        ...state,
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        totalItems: 0,
      };

    case 'LOAD_WISHLIST': {
      const items = action.payload.items;

      return {
        ...state,
        items,
        totalItems: items.length,
      };
    }

    default:
      return state;
  }
};

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedWishlist.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
        dispatch({ type: 'LOAD_WISHLIST', payload: { items: itemsWithDates } });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        // Clear corrupted wishlist data
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [state.items]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: string): boolean => {
    return state.items.some(item => item.product.id === productId);
  };

  const value: WishlistContextType = {
    state,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
