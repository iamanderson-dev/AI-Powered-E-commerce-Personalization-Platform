import { NextResponse } from 'next/server'
import OpenAI from 'openai';
import { connectToDatabase } from '@/lib/mongoose';
import FAQ from '../../../lib/models/FAQ';
import Order from '@/lib/models/Order';
import ChatSession from '@/lib/models/ChatSession';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST(req: Request) {
  await connectToDatabase();
  const { message, userId, sessionId } = await req.json();

  // Find or create chat session
  let chatSession;
  if (sessionId) {
    chatSession = await ChatSession.findById(sessionId);
  }
  if (!chatSession) {
    chatSession = await ChatSession.create({ userId, messages: [] });
  }

  // Store user message
  chatSession.messages.push({ sender: 'user', text: message });

  // Rule-based: FAQ search
  const faq = await FAQ.findOne({ $text: { $search: message } });
  if (faq) {
    chatSession.messages.push({ sender: 'bot', text: faq.answer });
    await chatSession.save();
    return NextResponse.json({ response: faq.answer, sessionId: chatSession._id });
  }

  // Track order intent
  const trackOrderMatch = message.match(/track.*order.*#?(\d+)/i);
  if (trackOrderMatch) {
    const orderId = trackOrderMatch[1];
    const order = await Order.findById(orderId);
    if (order) {
      const reply = `Order #${orderId} status: ${order.status}`;
      chatSession.messages.push({ sender: 'bot', text: reply });
      await chatSession.save();
      return NextResponse.json({ response: reply, sessionId: chatSession._id });
    } else {
      const reply = `Sorry, I couldn't find order #${orderId}.`;
      chatSession.messages.push({ sender: 'bot', text: reply });
      await chatSession.save();
      return NextResponse.json({ response: reply, sessionId: chatSession._id });
    }
  }

  // AI-powered: OpenAI GPT response
  // Disabled due to quota limits
  // let aiResponse = '';
  // if (OPENAI_API_KEY) {
  //   try {
  //     const completion = await openai.chat.completions.create({
  //       model: 'gpt-3.5-turbo',
  //       messages: [
  //         { role: 'system', content: 'You are a helpful e-commerce support bot.' },
  //         { role: 'user', content: message },
  //       ],
  //       max_tokens: 150,
  //     });
  //     aiResponse = completion.choices[0].message?.content || 'Sorry, I could not understand.';
  //     chatSession.messages.push({ sender: 'bot', text: aiResponse });
  //     await chatSession.save();
  //     // Escalate if AI can't help
  //     if (aiResponse.toLowerCase().includes('could not understand') || aiResponse.toLowerCase().includes('escalate')) {
  //       chatSession.status = 'escalated';
  //       await chatSession.save();
  //       // TODO: Notify admin (e.g., send email or dashboard alert)
  //     }
  //     return NextResponse.json({ response: aiResponse, sessionId: chatSession._id });
  //   } catch (error) {
  //     console.error('OpenAI API error:', error);
  //     chatSession.messages.push({ sender: 'bot', text: 'Sorry, something went wrong with AI.' });
  //     await chatSession.save();
  //     return NextResponse.json({ response: 'Sorry, something went wrong with AI.', sessionId: chatSession._id });
  //   }
  // }

  // Fallback
  chatSession.messages.push({ sender: 'bot', text: 'Sorry, I could not understand your request.' });
  chatSession.status = 'escalated';
  await chatSession.save();
  // TODO: Notify admin
  return NextResponse.json({ response: 'Sorry, I could not understand your request.', sessionId: chatSession._id });
}
