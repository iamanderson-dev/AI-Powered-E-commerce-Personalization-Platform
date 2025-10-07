'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * OrderHistory component - Displays user's order history
 * Features: Order list, status tracking, reorder functionality
 */
export default function OrderHistory() {
  const { state: authState } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Mock order data - replace with actual API call
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          price: 299.99,
          quantity: 1,
          image: '/placeholder-headphones.jpg',
        }
      ],
      trackingNumber: 'TRK123456789',
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      }
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 159.99,
      items: [
        {
          id: '3',
          name: 'Gaming Mechanical Keyboard',
          price: 159.99,
          quantity: 1,
          image: '/placeholder-keyboard.jpg',
        }
      ],
      trackingNumber: 'TRK987654321',
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      }
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 449.99,
      items: [
        {
          id: '5',
          name: 'Professional Camera Lens',
          price: 449.99,
          quantity: 1,
          image: '/placeholder-lens.jpg',
        }
      ],
      trackingNumber: null,
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'badge-success';
      case 'shipped':
        return 'badge-primary';
      case 'processing':
        return 'badge-warning';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <div className="text-sm text-gray-600">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <button className="btn-primary">Start Shopping</button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${order.total}</p>
                  <span className={`badge ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button className="btn btn-outline btn-sm">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="btn btn-outline btn-sm">
                      Reorder
                    </button>
                  )}
                  {order.trackingNumber && (
                    <button className="btn btn-outline btn-sm">
                      Track Package
                    </button>
                  )}
                </div>
                {order.trackingNumber && (
                  <div className="text-sm text-gray-600">
                    Tracking: {order.trackingNumber}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

