'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice, calculateDiscount } from '@/lib/api';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';

export default function CartPage() {
  const { state: cartState, updateQuantity, removeItem, clearCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { state: authState } = useAuth();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    setIsUpdating(itemId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
    
    setIsUpdating(null);
  };

  const handleRemoveItem = (itemId: string) => {
    setItemToRemove(itemId);
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = async () => {
    if (!itemToRemove) return;
    
    setIsRemoving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    removeItem(itemToRemove);
    
    setIsRemoving(false);
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const handleMoveToWishlist = (item: any) => {
    addToWishlist(item.product);
    removeItem(item.id);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const handleConfirmClear = async () => {
    setIsClearing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    clearCart();
    
    setIsClearing(false);
    setShowClearModal(false);
  };

  const handleCancelClear = () => {
    setShowClearModal(false);
  };

  const handleProceedToCheckout = async () => {
    if (!authState.isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    try {
      window.location.href = '/checkout';
    } catch (err: any) {
      setCheckoutError('Unable to proceed to checkout.');
    }
  };

  const subtotal = cartState.totalPrice;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {cartState.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartState.items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cartState.totalItems})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartState.items.map((item) => {
                    const discountPercentage = item.product.originalPrice
                      ? calculateDiscount(item.product.originalPrice, item.product.price)
                      : 0;

                    return (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-600">{item.product.brand}</p>
                            
                            {/* Size and Color */}
                            {(item.selectedSize || item.selectedColor) && (
                              <div className="text-sm text-gray-500 mt-1">
                                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                {item.selectedSize && item.selectedColor && <span> • </span>}
                                {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                              </div>
                            )}

                            {/* Price */}
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-lg font-semibold text-gray-900">
                                {formatPrice(item.product.price)}
                              </span>
                              {item.product.originalPrice && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(item.product.originalPrice)}
                                  </span>
                                  {discountPercentage > 0 && (
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                      -{discountPercentage}%
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={isUpdating === item.id}
                                className="p-2 hover:bg-gray-50 disabled:opacity-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
                                {isUpdating === item.id ? '...' : item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={isUpdating === item.id}
                                className="p-2 hover:bg-gray-50 disabled:opacity-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                {formatPrice(item.product.price * item.quantity)}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => handleMoveToWishlist(item)}
                              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                            >
                              Move to Wishlist
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {subtotal < 50 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-blue-900">Free shipping on orders over $50</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      Add {formatPrice(50 - subtotal)} more for free shipping
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  className="w-full btn-primary mt-6 text-center block"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
                {checkoutSuccess && (
                  <div className="mt-4 text-green-600 font-semibold text-center">
                    Payment intent created! Redirecting to checkout...
                  </div>
                )}
                {checkoutError && (
                  <div className="mt-4 text-red-600 font-semibold text-center">
                    {checkoutError}
                  </div>
                )}

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="w-full btn btn-outline mt-3 text-center block"
                >
                  Continue Shopping
                </Link>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Clear Cart Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearModal}
        onClose={handleCancelClear}
        onConfirm={handleConfirmClear}
        title="Clear Cart"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Keep Items"
        type="danger"
        isLoading={isClearing}
      />

      {/* Remove Item Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRemoveModal}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        message="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Keep Item"
        type="warning"
        isLoading={isRemoving}
      />
    </div>
  );
}