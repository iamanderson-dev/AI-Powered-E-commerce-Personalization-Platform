"use client";
import React, { useState } from 'react';

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState('E-commerce Store');
  const [currency, setCurrency] = useState('USD');
  const [email, setEmail] = useState('support@example.com');
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <h1 className="text-2xl font-bold mb-6">Store Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Store Name</label>
          <input
            className="input input-bordered w-full"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            className="input input-bordered w-full"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Support Email</label>
          <input
            className="input input-bordered w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
