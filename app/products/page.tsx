'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { searchProducts, filterProducts, sortProducts } from '@/lib/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Load initial products from API
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter and search products
  useEffect(() => {
    let result = [...products];

    // Apply search
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    if (minPrice) {
      result = result.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter(product => product.price <= parseFloat(maxPrice));
    }

    // Apply discount filter
    if (showDiscount) {
      result = result.filter(product => product.originalPrice && product.price < product.originalPrice);
    }

    // Apply availability filter
    if (showAvailable) {
      result = result.filter(product => product.inStock);
    }

    // Apply sorting
    result = sortProducts(result, sortBy);

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortBy, minPrice, maxPrice, showDiscount, showAvailable]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const categories = Array.from(new Set(products.map(product => product.category)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-custom py-8">
          <div className="flex items-center justify-center h-64">
            <div className="spinner w-8 h-8"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our complete collection of products
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Collapsible for mobile */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h2 className="text-lg font-bold">Filters & Search</h2>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          <div className={`flex flex-col lg:flex-row gap-4 ${!filtersOpen && 'lg:flex'} ${filtersOpen ? '' : 'hidden lg:flex'}`}>
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="input w-full"
              />
            </div>
            {/* Category Filter */}
            <div className="lg:w-48">
              <select 
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="input w-full"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {/* Price Range Filter */}
            <div className="lg:w-48 flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min Price"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="input w-1/2"
              />
              <input
                type="number"
                min="0"
                placeholder="Max Price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="input w-1/2"
              />
            </div>
            {/* Discount & Availability */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDiscount}
                  onChange={e => setShowDiscount(e.target.checked)}
                />
                <span>Discounted</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showAvailable}
                  onChange={e => setShowAvailable(e.target.checked)}
                />
                <span>In Stock</span>
              </label>
            </div>
            {/* Sort */}
            <div className="lg:w-48">
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="input w-full"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {searchQuery && (
                <span> for "<strong>{searchQuery}</strong>"</span>
              )}
              {selectedCategory && (
                <span> in <strong>{selectedCategory}</strong></span>
              )}
              {(minPrice || maxPrice) && (
                <span> in price range <strong>${minPrice || 0} - ${maxPrice || '∞'}</strong></span>
              )}
              {showDiscount && (
                <span> (Discounted)</span>
              )}
              {showAvailable && (
                <span> (In Stock)</span>
              )}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid-products">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory
                ? "Try adjusting your search or filter criteria"
                : "No products are currently available"
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="btn btn-outline btn-sm">
              Previous
            </button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-outline btn-sm">2</button>
            <button className="btn btn-outline btn-sm">3</button>
            <button className="btn btn-outline btn-sm">
              Next
            </button>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
