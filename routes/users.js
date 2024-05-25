const express = require('express');
const users = require('../data/users');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email    
  };

  users.push(user);
  res.status(201).json(user);
});

router.get('/:id', (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('user not found');
  res.json(user);
});

router.put('/:id', (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  

  res.json(user);
});

router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(item => item.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

module.exports = router;
