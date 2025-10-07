'use client';

import { Metadata } from 'next';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const { state: cartState, clearCart } = useCart();
  const { state: authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');

  // Shipping/billing form state
  const [shipping, setShipping] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: '',
  });
  const [billing, setBilling] = useState({ ...shipping });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: 'shipping' | 'billing') => {
    const { name, value } = e.target;
    if (type === 'shipping') setShipping(prev => ({ ...prev, [name]: value }));
    else setBilling(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cartState,
          user: authState.user,
          shippingAddress: shipping,
          billingAddress: billing,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" value={shipping.firstName} onChange={e => handleInput(e, 'shipping')} className="input w-full" placeholder="First Name" />
              <input name="lastName" value={shipping.lastName} onChange={e => handleInput(e, 'shipping')} className="input w-full" placeholder="Last Name" />
              <input name="email" value={shipping.email} onChange={e => handleInput(e, 'shipping')} className="input w-full md:col-span-2" placeholder="Email Address" />
              <input name="address1" value={shipping.address1} onChange={e => handleInput(e, 'shipping')} className="input w-full md:col-span-2" placeholder="Address" />
              <input name="city" value={shipping.city} onChange={e => handleInput(e, 'shipping')} className="input w-full" placeholder="City" />
              <input name="state" value={shipping.state} onChange={e => handleInput(e, 'shipping')} className="input w-full" placeholder="State" />
              <input name="zipCode" value={shipping.zipCode} onChange={e => handleInput(e, 'shipping')} className="input w-full" placeholder="ZIP Code" />
              <input name="phone" value={shipping.phone} onChange={e => handleInput(e, 'shipping')} className="input w-full" placeholder="Phone Number" />
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${cartState.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${cartState.totalPrice >= 50 ? 'Free' : '9.99'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${(cartState.totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${(cartState.totalPrice + (cartState.totalPrice >= 50 ? 0 : 9.99) + cartState.totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              className="btn-primary w-full mb-4"
              onClick={handleCheckout}
              disabled={loading || cartState.items.length === 0}
            >
              {loading ? 'Processing...' : 'Pay with Stripe'}
            </button>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {clientSecret && (
              <div className="mt-6">
                <p className="text-green-600 font-semibold mb-2">Payment intent created!</p>
                <p>Order ID: {orderId}</p>
                <p>Client Secret: {clientSecret}</p>
                {/* Integrate Stripe Elements here for real payment UI */}
              </div>
            )}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                By completing your order, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>{' '}and{' '}
                <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>256-bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

