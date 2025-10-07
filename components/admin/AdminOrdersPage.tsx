"use client";
import React, { useState } from 'react';
import { mockOrders, Order } from '@/data/orders';

const statuses: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [orders, setOrders] = useState(mockOrders);

  const filtered = orders.filter(o =>
    (!search || o.user.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || o.status === filter)
  );

  const handleStatusChange = (id: string, status: Order['status']) => {
    setOrders(orders => orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input input-bordered"
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="input input-bordered"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, idx) => (
              <tr key={order.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 font-medium">{order.id}</td>
                <td className="px-4 py-2">{order.user}</td>
                <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className="input input-bordered input-xs"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
