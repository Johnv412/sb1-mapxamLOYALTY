const express = require('express');
const router = express.Router();
const GiftCard = require('../models/GiftCard');

// Get all gift cards
router.get('/', async (req, res) => {
  try {
    const giftCards = await GiftCard.find();
    res.json(giftCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new gift card
router.post('/', async (req, res) => {
  const giftCard = new GiftCard(req.body);
  try {
    const newGiftCard = await giftCard.save();
    res.status(201).json(newGiftCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific gift card
router.get('/:id', getGiftCard, (req, res) => {
  res.json(res.giftCard);
});

// Update a gift card
router.patch('/:id', getGiftCard, async (req, res) => {
  if (req.body.name != null) {
    res.giftCard.name = req.body.name;
  }
  // Add other fields here
  try {
    const updatedGiftCard = await res.giftCard.save();
    res.json(updatedGiftCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a gift card
router.delete('/:id', getGiftCard, async (req, res) => {
  try {
    await res.giftCard.remove();
    res.json({ message: 'Deleted Gift Card' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getGiftCard(req, res, next) {
  let giftCard;
  try {
    giftCard = await GiftCard.findById(req.params.id);
    if (giftCard == null) {
      return res.status(404).json({ message: 'Cannot find gift card' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.giftCard = giftCard;
  next();
}

module.exports = router;