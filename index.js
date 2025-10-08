const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://ataherelae_db_user:UquOBcYggudHJqjL@cluster0.y4p0pzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema + Model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

// Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get random story
app.get("/Story", async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length === 0)
      return res.status(404).json({ message: "No items found" });
    const randomIndex = Math.floor(Math.random() * items.length);
    res.json(items[randomIndex]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create item
app.post("/items", async (req, res) => {
  try {
    const { name, description, url } = req.body;
    const newItem = new Item({ name, description, url });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update item
app.put("/items/:id", async (req, res) => {
  try {
    const { name, description, url } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, url },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete item
app.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
