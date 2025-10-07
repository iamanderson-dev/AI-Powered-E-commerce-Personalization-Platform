import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import ChatSession from '@/lib/models/ChatSession';

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ messages: [] });
  const session = await ChatSession.findById(id);
  if (!session) return NextResponse.json({ messages: [] });
  return NextResponse.json({ messages: session.messages });
}
