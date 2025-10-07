import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'E-commerce Store - Home',
  description: 'Welcome to our modern e-commerce store with the latest products',
};



export default function HomePage() {
  return <HomePageClient />;
}


