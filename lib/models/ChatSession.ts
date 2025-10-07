import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'bot', 'admin'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSessionSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  messages: [MessageSchema],
  status: { type: String, enum: ['open', 'closed', 'escalated'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.ChatSession || mongoose.model('ChatSession', ChatSessionSchema);
