// routes/menus.js
const express = require('express');
const router = express.Router();
const menus = require("../data/menus");
const app = express()


//middleware
app.get('/api/menus', (req, res) => {
  res.json(menus);
});

app.post('/api/menus', (req, res) => {
  const menu = {
    id: menus.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  };
  menus.push(menu);
  res.status(201).json(menu);
});

app.get('/api/menus/:id', (req, res) => {
  const menu = menus.find(item => item.id === parseInt(req.params.id));
  if (!menu) return res.status(404).send('Menu item not found');
  res.json(menu);
});

app.put('/api/menus/:id', (req, res) => {
  const menu = menus.find(item => item.id === parseInt(req.params.id));
  if (!menu) return res.status(404).send('Menu item not found');

  menu.name = req.body.name || menu.name;
  menu.description = req.body.description || menu.description;
  menu.price = req.body.price || menu.price;
  menu.image = req.body.image || menu.image;

  res.json(menu);
});

app.delete('/api/menus/:id', (req, res) => {
  const menuItemIndex = menus.findIndex(item => item.id === parseInt(req.params.id));
  if (menuItemIndex === -1) return res.status(404).send('Menu item not found');

  const deletedMenuItem = menus.splice(menuItemIndex, 1);
  res.json(deletedMenuItem[0]);
});

module.exports = router;