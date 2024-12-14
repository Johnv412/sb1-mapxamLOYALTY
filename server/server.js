const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb://localhost/pizza_rewards', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const rewardsRoutes = require('./routes/rewards');
const giftCardsRoutes = require('./routes/giftCards');

app.use('/api/rewards', rewardsRoutes);
app.use('/api/giftcards', giftCardsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});