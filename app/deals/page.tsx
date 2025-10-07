import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Deals & Offers - E-commerce Store',
  description: 'Find the best deals and discounts on our products',
};

export default function DealsPage() {
  const deals = [
    {
      id: 'flash-sale',
      title: 'Flash Sale',
      description: 'Limited time offers - up to 70% off',
      discount: '70%',
      timeLeft: '2 days left',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'weekend-deals',
      title: 'Weekend Special',
      description: 'Weekend-only discounts on selected items',
      discount: '50%',
      timeLeft: '3 days left',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'clearance',
      title: 'Clearance Sale',
      description: 'Last chance to grab these items',
      discount: '60%',
      timeLeft: '5 days left',
      color: 'from-green-500 to-green-600'
    }
  ];

  const featuredDeals = [
    {
      id: 'deal-1',
      name: 'Premium Wireless Headphones',
      originalPrice: 299.99,
      currentPrice: 149.99,
      discount: 50,
      image: '/placeholder-deal.jpg',
      brand: 'AudioTech',
      rating: 4.8,
      reviewCount: 124,
      timeLeft: '23:45:12'
    },
    {
      id: 'deal-2',
      name: 'Smart Fitness Watch',
      originalPrice: 199.99,
      currentPrice: 99.99,
      discount: 50,
      image: '/placeholder-deal.jpg',
      brand: 'FitTech',
      rating: 4.6,
      reviewCount: 89,
      timeLeft: '12:30:45'
    },
    {
      id: 'deal-3',
      name: 'Gaming Mechanical Keyboard',
      originalPrice: 159.99,
      currentPrice: 79.99,
      discount: 50,
      image: '/placeholder-deal.jpg',
      brand: 'GameGear',
      rating: 4.7,
      reviewCount: 156,
      timeLeft: '18:15:30'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Deals & Offers
          </h1>
          <p className="text-gray-600">
            Don't miss out on these amazing deals
          </p>
        </div>

        {/* Deal Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {deals.map((deal) => (
            <div key={deal.id} className={`bg-gradient-to-r ${deal.color} rounded-lg p-6 text-white relative overflow-hidden`}>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                <p className="text-white text-opacity-90 mb-4">{deal.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{deal.discount} OFF</span>
                  <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {deal.timeLeft}
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>
          ))}
        </div>

        {/* Featured Deals */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Deals
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Limited Time Offers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <div key={deal.id} className="card card-hover relative">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="badge badge-error text-sm font-bold">
                    -{deal.discount}%
                  </span>
                </div>

                {/* Timer */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-mono">
                    {deal.timeLeft}
                  </div>
                </div>

                <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-1">{deal.brand}</p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {deal.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(deal.rating)
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
                      ({deal.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${deal.currentPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      Save ${(deal.originalPrice - deal.currentPrice).toFixed(2)}
                    </span>
                  </div>

                  <button className="w-full btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Get Deal Alerts</h3>
          <p className="text-primary-100 mb-6">
            Subscribe to our newsletter and be the first to know about new deals and offers
          </p>
          <div className="max-w-md mx-auto flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="px-6 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

