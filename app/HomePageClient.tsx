"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecommendationCarousel from '@/components/RecommendationCarousel';
import RecommendedProducts from '@/components/RecommendedProducts';
import { UserBehaviorProvider, useUserBehavior } from '@/contexts/UserBehaviorContext';

function HomePageContent() {
  const { viewedProductIds } = useUserBehavior();
  return (
    <>
      <Navbar />
      <main className="container-custom">
                {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover Amazing
              </span>
              <br />
              <span className="text-gray-900">
                Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Shop the latest trends with unbeatable prices and fast delivery. 
              Experience shopping reimagined.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200">
                Shop Now
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                Explore Collections
              </button>
            </div>
            <div className="pt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Shipping Over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </section>

                {/* Featured Products */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked items just for you
            </p>
          </div>
          <RecommendationCarousel />
        </section>

        {/* Recommended for You */}
        {viewedProductIds.length > 0 && (
          <RecommendedProducts title="Because you viewed..." />
        )}

                {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Shop With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best in online shopping
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fast Shipping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get your orders delivered quickly and safely to your doorstep with real-time tracking.
              </p>
              <div className="mt-6 flex items-center text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We stand behind every product we sell with a 100% satisfaction guarantee and easy returns.
              </p>
              <div className="mt-6 flex items-center text-sm font-semibold text-gray-400 group-hover:text-purple-600 transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                💬
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is always here to help you with any questions or concerns.
              </p>
              <div className="mt-6 flex items-center text-sm font-semibold text-gray-400 group-hover:text-green-600 transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function HomePageClient() {
  return (
    <UserBehaviorProvider>
      <HomePageContent />
    </UserBehaviorProvider>
  );
}
