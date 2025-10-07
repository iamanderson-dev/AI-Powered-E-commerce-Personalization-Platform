import * as React from 'react';
import { Metadata } from 'next';
import ProductClient from './ProductClient';
import { UserBehaviorProvider } from '@/contexts/UserBehaviorContext';

export const metadata = {
  title: 'Product Details',
  description: 'View product details, reviews, and recommendations.',
};

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Server component: wraps client component in UserBehaviorProvider
  return (
    <UserBehaviorProvider>
      <ProductClient params={params} />
    </UserBehaviorProvider>
  );
}
