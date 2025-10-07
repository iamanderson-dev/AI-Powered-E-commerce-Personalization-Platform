'use client';

import { useState } from 'react';

/**
 * PaymentMethods component - Manages user's payment methods
 * Features: Credit cards, PayPal, add/edit/delete methods
 */
export default function PaymentMethods() {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    isDefault: false,
  });

  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'visa',
      lastFour: '4532',
      expiryMonth: '12',
      expiryYear: '2027',
      cardholderName: 'John Doe',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '8901',
      expiryMonth: '08',
      expiryYear: '2026',
      cardholderName: 'John Doe',
      isDefault: false,
    }
  ]);

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        );
      case 'mastercard':
        return (
          <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        );
      case 'amex':
        return (
          <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
        );
      default:
        return (
          <div className="w-8 h-5 bg-gray-400 rounded text-white text-xs flex items-center justify-center">
            ••••
          </div>
        );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cardType = formData.cardNumber.startsWith('4') ? 'visa' : 
                     formData.cardNumber.startsWith('5') ? 'mastercard' : 'other';
    
    if (editingCard) {
      // Update existing card
      setPaymentMethods(prev => prev.map(card => 
        card.id === editingCard 
          ? { 
              ...card, 
              cardholderName: formData.cardholderName,
              expiryMonth: formData.expiryMonth,
              expiryYear: formData.expiryYear,
              isDefault: formData.isDefault,
            }
          : card
      ));
      setEditingCard(null);
    } else {
      // Add new card
      const newCard = {
        id: Date.now().toString(),
        type: cardType,
        lastFour: formData.cardNumber.slice(-4),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cardholderName: formData.cardholderName,
        isDefault: formData.isDefault,
      };
      setPaymentMethods(prev => [...prev, newCard]);
    }
    
    setIsAddingCard(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      isDefault: false,
    });
  };

  const handleEdit = (card: any) => {
    setFormData({
      cardNumber: '•••• •••• •••• ' + card.lastFour,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: '',
      cardholderName: card.cardholderName,
      isDefault: card.isDefault,
    });
    setEditingCard(card.id);
    setIsAddingCard(true);
  };

  const handleDelete = (cardId: string) => {
    setPaymentMethods(prev => prev.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId: string) => {
    setPaymentMethods(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId,
    })));
  };

  const cancelForm = () => {
    setIsAddingCard(false);
    setEditingCard(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => setIsAddingCard(true)}
          className="btn-primary"
        >
          Add Payment Method
        </button>
      </div>

      {/* Add/Edit Card Form */}
      {isAddingCard && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {editingCard ? 'Edit Payment Method' : 'Add Payment Method'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                disabled={!!editingCard}
                className="input w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Month *
                </label>
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  required
                  className="input w-full"
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Year *
                </label>
                <select
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  required
                  className="input w-full"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={String(new Date().getFullYear() + i)}>
                      {new Date().getFullYear() + i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={4}
                  required
                  className="input w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="input w-full"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Set as default payment method
              </label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button type="submit" className="btn-primary">
                {editingCard ? 'Update Payment Method' : 'Add Payment Method'}
              </button>
              <button type="button" onClick={cancelForm} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getCardIcon(method.type)}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">
                      •••• •••• •••• {method.lastFour}
                    </h3>
                    {method.isDefault && (
                      <span className="badge badge-primary">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                  <p className="text-sm text-gray-600">
                    {method.cardholderName}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="btn btn-outline btn-sm"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(method)}
                  className="btn btn-outline btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="btn btn-outline btn-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && !isAddingCard && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No payment methods</h3>
          <p className="text-gray-600 mb-6">Add a payment method to make checkout faster</p>
          <button
            onClick={() => setIsAddingCard(true)}
            className="btn-primary"
          >
            Add Payment Method
          </button>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="text-sm text-blue-800">
            <strong>Secure:</strong> Your payment information is encrypted and stored securely. We never store your full card number or CVV.
          </div>
        </div>
      </div>
    </div>
  );
}

