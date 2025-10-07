import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, email, password } = await req.json();
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
}
