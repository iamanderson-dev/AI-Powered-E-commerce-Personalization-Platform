'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { getFeaturedProducts } from '@/lib/products';
import { motion } from './Motion';

/**
 * RecommendationCarousel component - Displays featured/recommended products in a carousel
 * Features: Auto-play, manual navigation, responsive design, product recommendations
 */
export default function RecommendationCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  // Load featured products
  useEffect(() => {
    const featuredProducts = getFeaturedProducts(8);
    setProducts(featuredProducts);
  }, []);

  const slidesToShow = 4;
  const totalSlides = Math.ceil(products.length / slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const getVisibleProducts = () => {
    const startIndex = currentSlide * slidesToShow;
    return products.slice(startIndex, startIndex + slidesToShow);
  };

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: -currentSlide * 100 + "%" }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          style={{ width: `${totalSlides * 100}%` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        aria-label="Previous products"
        whileTap={{ scale: 0.85 }}
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        aria-label="Next products"
        whileTap={{ scale: 0.85 }}
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileTap={{ scale: 0.7 }}
          />
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-center space-x-4 mt-6 md:hidden">
        <motion.button
          onClick={prevSlide}
          className="btn btn-outline btn-sm"
          whileTap={{ scale: 0.9 }}
        >
          Previous
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="btn btn-outline btn-sm"
          whileTap={{ scale: 0.9 }}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
}
