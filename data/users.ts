export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'customer';
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: 'USR-1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2025-01-01',
  },
  {
    id: 'USR-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'manager',
    createdAt: '2025-02-15',
  },
  {
    id: 'USR-3',
    name: 'Michael Lee',
    email: 'michael@example.com',
    role: 'customer',
    createdAt: '2025-03-10',
  },
  {
    id: 'USR-4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    role: 'customer',
    createdAt: '2025-04-20',
  },
  {
    id: 'USR-5',
    name: 'David Kim',
    email: 'david@example.com',
    role: 'customer',
    createdAt: '2025-05-05',
  },
];
