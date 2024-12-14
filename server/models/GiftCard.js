const mongoose = require('mongoose');

const GiftCardSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  currency: { type: String, required: true },
  type: { type: String, enum: ['paid', 'free'], required: true },
  neverExpire: { type: Boolean, default: false },
  expirationDate: { type: Date },
  quota: { type: Number, required: true },
  validity: { type: String, required: true },
  couponCode: { type: String },
  terms: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GiftCard', GiftCardSchema);