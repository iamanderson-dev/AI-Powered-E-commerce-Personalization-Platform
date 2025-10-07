export interface Order {
  id: string;
  user: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-1001',
    user: 'John Smith',
    total: 299.99,
    status: 'Delivered',
    createdAt: '2025-09-01',
  },
  {
    id: 'ORD-1002',
    user: 'Sarah Johnson',
    total: 159.99,
    status: 'Shipped',
    createdAt: '2025-09-05',
  },
  {
    id: 'ORD-1003',
    user: 'Michael Lee',
    total: 89.99,
    status: 'Processing',
    createdAt: '2025-09-10',
  },
  {
    id: 'ORD-1004',
    user: 'Emily Brown',
    total: 449.99,
    status: 'Pending',
    createdAt: '2025-09-12',
  },
  {
    id: 'ORD-1005',
    user: 'David Kim',
    total: 79.99,
    status: 'Cancelled',
    createdAt: '2025-09-15',
  },
];
