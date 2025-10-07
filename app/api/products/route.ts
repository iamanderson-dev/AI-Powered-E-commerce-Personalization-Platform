import { NextResponse } from 'next/server';
import Product from '@/lib/models/Product';
import { connectToDatabase } from '@/lib/mongoose';
import { requireAdmin } from '../middleware';

export async function GET() {
  await connectToDatabase();
  const products = await Product.find({});
  return NextResponse.json(products);
  }


export async function POST(req: Request) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck) return adminCheck;

  await connectToDatabase();
  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product, { status: 201 });
}
