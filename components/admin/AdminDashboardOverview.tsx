"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const metrics = [
  { label: 'Sales', value: '$12,340', icon: '💰', color: 'bg-green-100 text-green-700' },
  { label: 'Orders', value: '1,234', icon: '🧾', color: 'bg-blue-100 text-blue-700' },
  { label: 'Users', value: '567', icon: '👤', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Products', value: '89', icon: '📦', color: 'bg-purple-100 text-purple-700' },
];

const chartData = [
  { name: 'Jan', sales: 2000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2500 },
  { name: 'Apr', sales: 4000 },
  { name: 'May', sales: 3500 },
  { name: 'Jun', sales: 4200 },
  { name: 'Jul', sales: 3900 },
  { name: 'Aug', sales: 4800 },
  { name: 'Sep', sales: 5300 },
  { name: 'Oct', sales: 4700 },
  { name: 'Nov', sales: 5100 },
  { name: 'Dec', sales: 6000 },
];

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className={`rounded-xl p-6 flex items-center space-x-4 shadow-sm ${m.color}`}>
            <span className="text-3xl">{m.icon}</span>
            <div>
              <div className="text-lg font-bold">{m.value}</div>
              <div className="text-sm text-gray-600">{m.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
