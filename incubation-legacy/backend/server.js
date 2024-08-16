const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, 'data.json');

// Get all items
app.get('/items', async (req, res) => {
  try {
    const data = await fs.readJson(dataFilePath);
    res.json(data.items);
  } catch (error) {
    res.status(500).json({ message: 'Error reading items' });
  }
});

// Get the cart
app.get('/cart', async (req, res) => {
  try {
    const data = await fs.readJson(dataFilePath);
    res.json(data.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error reading cart' });
  }
});

// Update items in data.json
app.post('/update-items', async (req, res) => {
  try {
    const newItems = req.body;
    const data = await fs.readJson(dataFilePath);
    data.items = newItems;
    await fs.writeJson(dataFilePath, data);
    res.json({ message: 'Items updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating items' });
  }

  app.post('/update-cart', async (req, res) => {
    try {
      const newCart = req.body;
      const data = await fs.readJson(dataFilePath);
      data.cart = newCart;
      await fs.writeJson(dataFilePath, data);
      res.json({ message: 'Cart updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart' });
    }
  });
  
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
