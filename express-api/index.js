const express = require('express');

const app = express();
const PORT = 8003;

app.use(express.json());

// In-memory storage
const itemsDb = new Map([
  [1, { id: 1, name: 'Laptop', price: 999.99 }],
  [2, { id: 2, name: 'Keyboard', price: 79.99 }],
  [3, { id: 3, name: 'Mouse', price: 29.99 }],
]);
let nextId = 4;

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express!', framework: 'Express' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'express-api' });
});

app.get('/items', (req, res) => {
  res.json(Array.from(itemsDb.values()));
});

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = itemsDb.get(id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

app.post('/items', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Missing required fields: name, price' });
  }
  
  const newItem = {
    id: nextId,
    name,
    price: parseFloat(price),
  };
  
  itemsDb.set(nextId, newItem);
  nextId++;
  
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});

