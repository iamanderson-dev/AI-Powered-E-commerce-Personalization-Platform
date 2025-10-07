"use client";
import React, { useState } from 'react';
import { mockUsers, User } from '@/data/users';

const roles: User['role'][] = ['admin', 'manager', 'customer'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);

  const handleRoleChange = (id: string, role: User['role']) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, role } : u));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 font-medium">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value as User['role'])}
                    className="input input-bordered input-xs"
                  >
                    {roles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
