const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const uri = "mongodb+srv://clpope:Quicksc0ped0@cluster0.kamrf.mongodb.net/DivvyDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());

// Define Mongoose Schemas

// User Schema
const userSchema = new mongoose.Schema({
  userID: Number,
  name: String,
  friends: [Number],
  iou: {
    receivedTickets: [Number],
    givenTickets: [Number]
  },
  events: [{
    hosted: [{
      eventID: Number,
      receiptID: Number,
      status: String,
      photos: [String]
    }],
    participating: [{
      eventID: Number,
      receiptID: Number,
      status: String,
      photos: [String]
    }]
  }]
});

const User = mongoose.model("User", userSchema);

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  ticketID: Number,
  giver: {
    userID: Number
  },
  receiver: {
    userID: Number
  },
  type: String,
  paid: Boolean
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// Receipt Schema
const receiptSchema = new mongoose.Schema({
  receiptID: Number,
  eventID: Number,
  totalPrice: Number,
  pricePerUser: Number,
  priceRemaining: Number,
  users: [Number],
  paid: [Number],
  items: [{
    itemID: Number,
    totalPrice: Number,
    priceRemaining: Number,
    pricePerUser: Number
  }],
  history: [{
    userID: Number,
    paymentAmount: Number,
    date: String
  }]
});

const Receipt = mongoose.model("Receipt", receiptSchema);

// Routes

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by userID
app.get("/api/users/userID/:userID", async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userID }); // Use userID instead of _id
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
app.put("/api/users/:userID", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ userID: req.params.id }, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
app.delete("/api/users/:userID", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ userID: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/tickets/ticketID/:ticketID", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketID: req.params.ticketID }); 
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new ticket
app.post("/api/tickets", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all receipts
app.get("/api/receipts", async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single receipt from receiptID
app.get("/api/receipts/receiptID/:receiptID", async (req, res) => {
try {
  const receipt = await Receipt.findOne({ receiptID: req.params.receiptID }); 
  if (!receipt) return res.status(404).json({ message: "Receipt not found" });
  res.status(200).json(receipts);
} catch (err) {
  res.status(500).json({ message: err.message });
}
});

// Create a new receipt
app.post("/api/receipts", async (req, res) => {
  try {
    const receipt = new Receipt(req.body);
    await receipt.save();
    res.status(201).json(receipt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
