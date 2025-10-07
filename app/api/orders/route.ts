import { NextResponse } from 'next/server';
import Order from '@/lib/models/Order';
import { connectToDatabase } from '@/lib/mongoose';
import { requireAdmin } from '../middleware';

export async function GET(req: Request) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck) return adminCheck;

  await connectToDatabase();
  const orders = await Order.find({});
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const order = await Order.create(data);
  return NextResponse.json(order, { status: 201 });
}
