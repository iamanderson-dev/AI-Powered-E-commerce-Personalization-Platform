import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/mongoose';

// Example: expects req.headers.get('x-user-role') === 'admin'
export async function requireAdmin(req: NextRequest) {
  await connectToDatabase();
  const role = req.headers.get('x-user-role');
  if (role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  return null;
}
