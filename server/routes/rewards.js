const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');

// Get all rewards
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new reward
router.post('/', async (req, res) => {
  const reward = new Reward(req.body);
  try {
    const newReward = await reward.save();
    res.status(201).json(newReward);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific reward
router.get('/:id', getReward, (req, res) => {
  res.json(res.reward);
});

// Update a reward
router.patch('/:id', getReward, async (req, res) => {
  if (req.body.name != null) {
    res.reward.name = req.body.name;
  }
  // Add other fields here
  try {
    const updatedReward = await res.reward.save();
    res.json(updatedReward);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a reward
router.delete('/:id', getReward, async (req, res) => {
  try {
    await res.reward.remove();
    res.json({ message: 'Deleted Reward' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getReward(req, res, next) {
  let reward;
  try {
    reward = await Reward.findById(req.params.id);
    if (reward == null) {
      return res.status(404).json({ message: 'Cannot find reward' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.reward = reward;
  next();
}

module.exports = router;