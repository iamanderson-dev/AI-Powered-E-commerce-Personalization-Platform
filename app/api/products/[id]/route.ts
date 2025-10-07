import { NextResponse } from 'next/server';
import Product from '@/lib/models/Product';
import { connectToDatabase } from '@/lib/mongoose';
import { requireAdmin } from '../../middleware';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const adminCheck = await requireAdmin(req);
  if (adminCheck) return adminCheck;

  await connectToDatabase();
  const data = await req.json();
  const product = await Product.findByIdAndUpdate(params.id, data, { new: true });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const adminCheck = await requireAdmin(_req);
  if (adminCheck) return adminCheck;

  await connectToDatabase();
  const product = await Product.findByIdAndDelete(params.id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
