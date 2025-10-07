import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Categories - E-commerce Store',
  description: 'Browse products by category',
};

export default function CategoriesPage() {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image: '/placeholder-category.jpg',
      productCount: 156,
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories']
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Fashion for every occasion',
      image: '/placeholder-category.jpg',
      productCount: 89,
      subcategories: ['Men', 'Women', 'Kids', 'Accessories']
    },
    {
      id: 'home',
      name: 'Home & Garden',
      description: 'Everything for your home',
      image: '/placeholder-category.jpg',
      productCount: 234,
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden']
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      description: 'Gear up for your active lifestyle',
      image: '/placeholder-category.jpg',
      productCount: 67,
      subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Equipment']
    },
    {
      id: 'books',
      name: 'Books & Media',
      description: 'Expand your knowledge',
      image: '/placeholder-category.jpg',
      productCount: 123,
      subcategories: ['Fiction', 'Non-fiction', 'Educational', 'Digital']
    },
    {
      id: 'beauty',
      name: 'Beauty & Health',
      description: 'Look and feel your best',
      image: '/placeholder-category.jpg',
      productCount: 78,
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Health']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-gray-600">
            Discover products organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="card card-hover group">
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="badge badge-primary">
                    {category.productCount} products
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                
                {/* Subcategories */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Popular Subcategories:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <span
                        key={subcategory}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {subcategory}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full btn-primary">
                  Shop {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
              <p className="text-primary-100 mb-6">
                Discover the latest products added to our store
              </p>
              <button className="btn bg-white text-primary-600 hover:bg-gray-100">
                Explore New Products
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Best Sellers</h3>
              <p className="text-secondary-100 mb-6">
                Check out our most popular products
              </p>
              <button className="btn bg-white text-secondary-600 hover:bg-gray-100">
                View Best Sellers
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

