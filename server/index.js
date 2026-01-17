const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());

const dataPath = path.join(process.cwd(), "server", "data", "items.json");

function readItems() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function writeItems(items) {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), "utf-8");
}

function makeId() {
  return `p_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/items", (_req, res) => {
  const items = readItems();
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const items = readItems();
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ ok: false, error: "Not found" });
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const { name, description, price, imageUrl, category, inStock } = req.body || {};

  if (!name || !description || typeof price !== "number" || Number.isNaN(price)) {
    return res.status(400).json({ ok: false, error: "Missing or invalid fields" });
  }

  const items = readItems();
  const item = {
    id: makeId(),
    name: String(name),
    description: String(description),
    price: Number(price),
    imageUrl: imageUrl ? String(imageUrl) : "/products/aurora-lamp.svg",
    category: category ? String(category) : "Home",
    inStock: typeof inStock === "boolean" ? inStock : true,
  };

  items.unshift(item);
  writeItems(items);

  res.status(201).json({ ok: true, item });
});

app.listen(PORT, () => {
  console.log(`Express API listening on http://localhost:${PORT}`);
});
