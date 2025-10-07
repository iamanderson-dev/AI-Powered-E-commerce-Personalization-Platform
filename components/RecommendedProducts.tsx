import React from 'react';
import ProductCard from './ProductCard';
import { getRecommendedProducts } from '@/lib/products';
import { useUserBehavior } from '@/contexts/UserBehaviorContext';

interface RecommendedProductsProps {
  limit?: number;
  title?: string;
  className?: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ limit = 4, title = 'Recommended for You', className }) => {
  const { viewedProductIds } = useUserBehavior();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const products = getRecommendedProducts(viewedProductIds, limit);
  if (!products.length) return null;
  return (
    <section className={className || 'mb-16'}>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
