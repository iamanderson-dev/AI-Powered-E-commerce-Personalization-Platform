import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import '@/styles/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64 transition-all duration-200">
        {children}
      </main>
    </div>
  );
}
