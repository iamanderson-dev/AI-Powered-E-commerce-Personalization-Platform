"use client";
import React, { useState } from 'react';
import { mockProducts } from '@/lib/products';

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const filtered = mockProducts.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || p.category === filter)
  );
  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input input-bordered"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="input input-bordered"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="btn-primary">Add Product</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, idx) => (
              <tr key={product.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2">{product.stockQuantity}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="btn btn-xs btn-outline">Edit</button>
                  <button className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
