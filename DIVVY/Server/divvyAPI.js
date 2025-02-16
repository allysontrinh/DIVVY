const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './mongodb.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000,  // Timeout for server selection
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.log('MongoDB connection error:', err.message);
});



// Sample User Schema
const userSchema = new mongoose.Schema({
  userID: Number,
  name: String,
  friends: [Number],
  iou: {
    receivedTickets: [Number],
    givenTickets: [Number]
  },
  events: {
    hosted: Array,
    participating: Array
  }
});

const User = mongoose.model('User', userSchema);

// API Endpoints
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ userID: req.params.id }, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await User.findOneAndDelete({ userID: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Test Route
app.get('1', (req, res) => {
  res.send('API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
