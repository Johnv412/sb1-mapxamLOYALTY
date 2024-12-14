const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  quota: { type: Number, required: true },
  validity: { type: String, required: true },
  neverExpire: { type: Boolean, default: false },
  expirationDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reward', RewardSchema);