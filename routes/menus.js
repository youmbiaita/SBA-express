
// routes/menus.js
const express = require("express");
const router = express.Router();
const menus = require("../data/menus");
const error = require("../utilities/error.js");

//validation middleware
const validateMenu = (req, res) => {
  const { name, description, price, image } = req.body;
  let message = "";
  if (!name) {
    message += 'name, ';
  }
  if (!description) {
    message += 'description, ';
  }
  if (!price) {
    message += 'price, ';
  }
  if (!image) {
    message += 'image.';
  }

  if(message != "") {
    return res.status(400).send("Missing field(s) required: " + message);
  }

  return null;
};

// middleware for getting all menus with optional filtering
router.get('/', (req, res) => {
  const { name, description, price, image } = req.query;
  let filteredMenus = menus;

  if (name) {
    filteredMenus = filteredMenus.filter(menu => menu.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (description) {
    filteredMenus = filteredMenus.filter(menu => menu.description == description);
  }
  if (price) {
    filteredMenus = filteredMenus.filter(menu => menu.price == price);
  }
  if (image) {
    filteredMenus = filteredMenus.filter(menu => menu.image == image);
  }

  res.json(filteredMenus);
});

// post of create bottom of submit in ejs file
router.post('/addMenu', (req, res) => {
  if(validateMenu(req, res) == null){
    const menu = {
      id: menus.length + 1,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    };
    menus.push(menu);
    res.status(201).json(menu);
  }
  
});

// get menus by id
router.get('/:id', (req, res) => {
  const menu = menus.find(item => item.id === parseInt(req.params.id));
  if (!menu) return res.status(404).send('Menu item not found');
  res.json(menu);
});

// update menu by Id using put
router.put('/:id', (req, res) => {
  const menu = menus.find(item => item.id === parseInt(req.params.id));
  if (!menu) return res.status(404).send('Menu item not found');

  menu.name = req.body.name || menu.name;
  menu.description = req.body.description || menu.description;
  menu.price = req.body.price || menu.price;
  menu.image = req.body.image || menu.image;

  res.json(menu);
});

// delete menu by Id
router.delete('/:id', (req, res) => {
  const menuItemIndex = menus.findIndex(item => item.id === parseInt(req.params.id));
  if (menuItemIndex === -1) return res.status(404).send('Menu item not found');

  const deletedMenuItem = menus.splice(menuItemIndex, 1);
  res.json(deletedMenuItem[0]);
});

module.exports = router;   