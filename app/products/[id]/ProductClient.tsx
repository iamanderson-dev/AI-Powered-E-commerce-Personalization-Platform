"use client";

import * as React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/ReviewCard';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';
import { getProductById, getRelatedProducts } from '@/lib/products';
import RecommendedProducts from '@/components/RecommendedProducts';
import { useUserBehavior } from '@/contexts/UserBehaviorContext';

interface ProductClientProps {
  params: {
    id: string;
  };
}

export default function ProductClient({ params }: ProductClientProps) {
  const { addViewedProduct } = useUserBehavior();
  React.useEffect(() => { addViewedProduct(params.id); }, [params.id, addViewedProduct]);
  // Get product data - replace with actual API call
  const product = getProductById(params.id) || {
    id: params.id,
    name: `Premium Wireless Headphones ${params.id}`,
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, gamers, and professionals.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      '/placeholder-product-1.jpg',
      '/placeholder-product-2.jpg',
      '/placeholder-product-3.jpg',
      '/placeholder-product-4.jpg'
    ],
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'AudioTech',
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 127,
    tags: ['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Frequency Response': '20Hz - 20kHz',
      'Impedance': '32 Ohms',
      'Warranty': '2 years'
    },
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (5 min = 3 hours)',
      'Premium comfort padding',
      'Crystal-clear microphone',
      'Multi-device pairing'
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const relatedProducts = getRelatedProducts(params.id);

  const reviews = [
    {
      id: 'review-1',
      userId: 'user-1',
      user: {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        role: 'customer' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      productId: product.id,
      product: product,
      rating: 5,
      title: 'Amazing sound quality!',
      comment: 'These headphones exceeded my expectations. The noise cancellation is incredible and the sound quality is crystal clear. Very comfortable for long listening sessions.',
      verified: true,
      helpful: 12,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 'review-2',
      userId: 'user-2',
      user: {
        id: 'user-2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@example.com',
        role: 'customer' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      productId: product.id,
      product: product,
      rating: 4,
      title: 'Great headphones with minor issues',
      comment: 'Overall great headphones. The sound quality is excellent and the battery life is impressive. The only downside is that they can get a bit warm during extended use.',
      verified: true,
      helpful: 8,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    }
  ];

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-primary-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/products" className="hover:text-primary-600">Products</a></li>
            <li><span>/</span></li>
            <li><a href={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary-600">{product.category}</a></li>
            <li><span>/</span></li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="badge badge-error">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {(product as any).features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">In Stock ({product.stockQuantity} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector and Actions */}
              <ProductActions product={product} stockQuantity={product.stockQuantity} />
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-primary-500 text-primary-600 font-medium">
                Specifications
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                Reviews ({product.reviewCount})
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                Shipping & Returns
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(product.specifications ?? {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>

        {/* Recommended for You */}
        <RecommendedProducts />
      </main>

      <Footer />
    </div>
  );
}
