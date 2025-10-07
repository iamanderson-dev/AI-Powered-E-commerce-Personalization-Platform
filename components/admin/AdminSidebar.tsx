"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/orders', label: 'Orders', icon: '🧾' },
  { href: '/admin/users', label: 'Users', icon: '👤' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-100 text-2xl font-bold text-primary-600 tracking-wide">
        Admin
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-primary-50 transition-colors ${pathname === link.href ? 'bg-primary-100 text-primary-700' : ''}`}
          >
            <span className="mr-3 text-lg">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
