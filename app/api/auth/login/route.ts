import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import { connectToDatabase } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // For demo: return user info (in production, issue JWT or session)
  return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
}
