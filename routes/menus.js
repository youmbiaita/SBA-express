const express = require('express');
const router = express.Router();
//Importing the data from our database file
const menus = require("../data/menus.js");

// Creating a simple GET route for individual posts,
// using a route parameter for the unique id.
router.get('/:id', (req, res, next) => {
  const menu = menus.find((m) => m.id == req.params.id);

  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  if (menu) res.json({ menu, links });
  else next();
});

//Creating a Post (POST)
router.post('/', (req, res) => {
    // Within the POST request route, we create a new
    // user with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
    if (req.body.name && req.body.description && req.body.price) {
      const menu = {
        id: menus[menus.length - 1].id + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      };
  
      menus.push(menu);
      res.json(menus[menus.length - 1]);
    } else next(error(400, 'Insufficient Data'));
  });
  
  router.patch('/:id', (req, res) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing user in the database.
    const menu = menus.find((m, i) => {
      if (m.id == req.params.id) {
        // iterating through the user object and updating each property with the data that was sent by the client
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });
  
    if (menu) res.json(menu);
    else next();
  });
  
  router.delete('/:id', (req, res) => {
    // The DELETE request route simply removes a resource.
    const menu = menus.find((m, i) => {
      if (m.id == req.params.id) {
        menus.splice(i, 1);
        return true;
      }
    });
  
    if (menu) res.json(menu);
    else next();
  });
  
  module.exports = router;