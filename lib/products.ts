// Recommend products based on viewed product IDs (same category or similar tags)
export const getRecommendedProducts = (viewedProductIds: string[], limit: number = 4): Product[] => {
  if (!viewedProductIds || viewedProductIds.length === 0) return getFeaturedProducts(limit);

  // Gather categories and tags from viewed products
  const viewedProducts = mockProducts.filter(p => viewedProductIds.includes(p.id));
  const categories = Array.from(new Set(viewedProducts.map(p => p.category)));
  const tags = Array.from(new Set(viewedProducts.flatMap(p => p.tags)));

  // Recommend products from same category or with overlapping tags, not already viewed
  const recommended = mockProducts.filter(p =>
    !viewedProductIds.includes(p.id) &&
    (categories.includes(p.category) || p.tags.some(tag => tags.includes(tag)))
  );

  // If not enough, fill with featured
  if (recommended.length < limit) {
    const filler = getFeaturedProducts(limit * 2).filter(p =>
      !viewedProductIds.includes(p.id) && !recommended.some(r => r.id === p.id)
    );
    return [...recommended, ...filler].slice(0, limit);
  }
  return recommended.slice(0, limit);
};
import { Product } from '@/types';

// Mock products data - replace with actual API calls
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    price: 299.99,
    originalPrice: 399.99,
    images: ['/placeholder-headphones.jpg'],
    category: 'electronics',
    subcategory: 'audio',
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
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with our advanced smartwatch. Features heart rate monitoring, GPS tracking, and 7-day battery life.',
    price: 199.99,
    originalPrice: 249.99,
    images: ['/placeholder-watch.jpg'],
    category: 'electronics',
    subcategory: 'wearables',
    brand: 'FitTech',
    inStock: true,
    stockQuantity: 23,
    rating: 4.6,
    reviewCount: 89,
    tags: ['fitness', 'smartwatch', 'health', 'gps'],
    specifications: {
      'Battery Life': '7 days',
      'Display': '1.4" AMOLED',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart Rate, GPS, Accelerometer',
      'Compatibility': 'iOS & Android',
      'Warranty': '1 year'
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Gaming Mechanical Keyboard',
    description: 'Dominate your games with our high-performance mechanical keyboard. Features RGB lighting, customizable keys, and tactile switches.',
    price: 159.99,
    originalPrice: 199.99,
    images: ['/placeholder-keyboard.jpg'],
    category: 'electronics',
    subcategory: 'gaming',
    brand: 'GameGear',
    inStock: true,
    stockQuantity: 8,
    rating: 4.7,
    reviewCount: 156,
    tags: ['gaming', 'mechanical', 'rgb', 'customizable'],
    specifications: {
      'Switch Type': 'Cherry MX Blue',
      'Backlighting': 'RGB',
      'Connectivity': 'USB-C',
      'Keycaps': 'PBT Double-shot',
      'Layout': '104-key',
      'Warranty': '2 years'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '4',
    name: 'Wireless Bluetooth Speaker',
    description: 'Portable speaker with 360-degree sound and 12-hour battery life. Perfect for parties, outdoor adventures, and home use.',
    price: 79.99,
    originalPrice: 99.99,
    images: ['/placeholder-speaker.jpg'],
    category: 'electronics',
    subcategory: 'audio',
    brand: 'SoundWave',
    inStock: true,
    stockQuantity: 31,
    rating: 4.5,
    reviewCount: 203,
    tags: ['portable', 'bluetooth', '360-degree', 'battery'],
    specifications: {
      'Battery Life': '12 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Output Power': '20W',
      'Frequency Response': '60Hz - 20kHz',
      'Water Resistance': 'IPX7',
      'Warranty': '1 year'
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-28'),
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    description: 'High-quality 50mm prime lens perfect for portrait photography. Features fast autofocus and excellent low-light performance.',
    price: 449.99,
    originalPrice: 599.99,
    images: ['/placeholder-lens.jpg'],
    category: 'electronics',
    subcategory: 'photography',
    brand: 'PhotoPro',
    inStock: true,
    stockQuantity: 5,
    rating: 4.9,
    reviewCount: 67,
    tags: ['camera', 'lens', 'portrait', 'professional'],
    specifications: {
      'Focal Length': '50mm',
      'Aperture': 'f/1.4',
      'Mount': 'Canon EF',
      'Weight': '290g',
      'Filter Size': '58mm',
      'Warranty': '3 years'
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic chair designed for long work sessions. Features adjustable lumbar support, armrests, and breathable mesh.',
    price: 299.99,
    originalPrice: 399.99,
    images: ['/placeholder-chair.jpg'],
    category: 'furniture',
    subcategory: 'office',
    brand: 'ComfortSeat',
    inStock: true,
    stockQuantity: 12,
    rating: 4.4,
    reviewCount: 89,
    tags: ['ergonomic', 'office', 'adjustable', 'mesh'],
    specifications: {
      'Material': 'Mesh & Plastic',
      'Weight Capacity': '300 lbs',
      'Adjustable Height': 'Yes',
      'Lumbar Support': 'Adjustable',
      'Armrests': 'Adjustable',
      'Warranty': '5 years'
    },
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    description: 'Control your smart home devices with our central hub. Compatible with Alexa, Google Assistant, and Apple HomeKit.',
    price: 129.99,
    originalPrice: 179.99,
    images: ['/placeholder-hub.jpg'],
    category: 'electronics',
    subcategory: 'smart-home',
    brand: 'SmartHome',
    inStock: true,
    stockQuantity: 18,
    rating: 4.3,
    reviewCount: 145,
    tags: ['smart-home', 'hub', 'alexa', 'homekit'],
    specifications: {
      'Connectivity': 'WiFi, Zigbee, Z-Wave',
      'Voice Control': 'Alexa, Google Assistant',
      'Compatibility': 'HomeKit, SmartThings',
      'Range': '100m',
      'Power': 'AC Adapter',
      'Warranty': '2 years'
    },
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '8',
    name: 'Premium Coffee Maker',
    description: 'Brew the perfect cup with our programmable coffee maker. Features 12-cup capacity, programmable timer, and thermal carafe.',
    price: 89.99,
    originalPrice: 119.99,
    images: ['/placeholder-coffee.jpg'],
    category: 'appliances',
    subcategory: 'kitchen',
    brand: 'BrewMaster',
    inStock: true,
    stockQuantity: 25,
    rating: 4.6,
    reviewCount: 178,
    tags: ['coffee', 'programmable', 'thermal', '12-cup'],
    specifications: {
      'Capacity': '12 cups',
      'Programmable': 'Yes',
      'Carafe': 'Thermal',
      'Filter': 'Permanent',
      'Auto Shut-off': 'Yes',
      'Warranty': '1 year'
    },
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-29'),
  }
];

// Helper functions for product data
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return mockProducts
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getRelatedProducts = (productId: string, limit: number = 3): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return mockProducts
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterProducts = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}): Product[] => {
  return mockProducts.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sortedProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sortedProducts;
  }
};

