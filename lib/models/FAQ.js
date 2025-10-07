const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true, text: true },
  answer: { type: String, required: true },
});

module.exports = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
