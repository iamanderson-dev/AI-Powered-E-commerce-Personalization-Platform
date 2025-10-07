'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, calculateDiscount } from '@/lib/api';
import { useToast } from './Toast';
import ConfirmationModal from './ConfirmationModal';

/**
 * CartSidebar component - Slide-out cart with full functionality
 * Features: View items, update quantities, remove items, proceed to checkout
 */
export default function CartSidebar() {
  const { state, updateQuantity, removeItem, clearCart, closeCart } = useCart();
  const { addToast } = useToast();
  const [showClearModal, setShowClearModal] = React.useState(false);
  const [isClearing, setIsClearing] = React.useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const handleConfirmClear = async () => {
    setIsClearing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    clearCart();
    addToast({
      type: 'info',
      title: 'Cart cleared',
      message: 'All items have been removed from your cart.',
    });
    
    setIsClearing(false);
    setShowClearModal(false);
  };

  const handleCancelClear = () => {
    setShowClearModal(false);
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Shopping Cart ({state.totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some items to get started</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="btn-primary"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => {
                const discountPercentage = item.product.originalPrice
                  ? calculateDiscount(item.product.originalPrice, item.product.price)
                  : 0;

                return (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.product.brand}
                      </p>
                      
                      {/* Size and Color */}
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedSize && item.selectedColor && <span> • </span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <>
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(item.product.originalPrice)}
                            </span>
                            {discountPercentage > 0 && (
                              <span className="text-xs bg-red-100 text-red-600 px-1 rounded">
                                -{discountPercentage}%
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(state.totalPrice)}
              </span>
            </div>

            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              className="w-full text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full btn btn-outline text-center"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full btn-primary text-center"
              >
                Checkout
              </Link>
            </div>

            {/* Shipping Info */}
            <div className="text-xs text-gray-600 text-center">
              <p>Free shipping on orders over $50</p>
              <p className="mt-1">
                {state.totalPrice >= 50 ? (
                  <span className="text-green-600 font-medium">You qualify for free shipping!</span>
                ) : (
                  <span>Add ${(50 - state.totalPrice).toFixed(2)} more for free shipping</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
}
