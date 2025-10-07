import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import Order from '@/lib/models/Order';
import { connectToDatabase } from '@/lib/mongoose';

export async function POST(req: Request) {
  await connectToDatabase();
  const { cart, user, shippingAddress, billingAddress } = await req.json();

  // Create Stripe payment intent
  const amount = Math.round(cart.totalPrice * 100); // cents
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: { userId: user.id },
  });

  // Create order in DB with paymentIntent id
  const order = await Order.create({
    userId: user.id,
    items: cart.items,
    totalAmount: cart.totalPrice,
    shippingAddress,
    billingAddress,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'stripe',
    transactionId: paymentIntent.id,
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
}
