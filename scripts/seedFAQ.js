require('dotenv').config({ path: './.env.local' });
console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);
const mongoose = require('mongoose');
const FAQ = require('../lib/models/FAQ');

const MONGODB_URI = process.env.MONGODB_URI || '';

async function seedFAQs() {
  await mongoose.connect(MONGODB_URI);
  const faqs = [
    {
      question: "Where's my order?",
      answer: "You can track your order status by providing your order number, e.g., 'Track order #123'."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer refunds within 30 days of purchase. Please contact support for more details."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via the chat or email us at support@example.com."
    }
  ];
  await FAQ.deleteMany({});
  await FAQ.insertMany(faqs);
  await FAQ.collection.createIndex({ question: "text" });
  console.log('FAQs seeded and text index created!');
  mongoose.disconnect();
}

seedFAQs();

// To run this script, use the command: node scripts/seedFAQ.js
