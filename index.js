const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://ataherelae_db_user:UquOBcYggudHJqjL@cluster0.y4p0pzb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

// Schema + Model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

// Get all items
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Create item
app.post("/api/items", async (req, res) => {
  const { name, description, url } = req.body;
  const newItem = new Item({ name, description, url });
  await newItem.save();
  res.json(newItem);
});

// Update item
app.put("/api/items/:id", async (req, res) => {
  const { name, description, url } = req.body;
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { name, description, url },
    { new: true }
  );
  res.json(updatedItem);
});

// Delete item
app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));


