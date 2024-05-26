const express = require('express');
const users = require('../data/users');
const router = express.Router();

//validate user middleware
const validateUser = (req, res) => {
  const { name, email } = req.body;
  let message = "";
  if (!name) {
    message += 'name, ';
  }
  if (!email) {
    message += 'email, ';
  }
  if(message != "") {
    return res.status(400).send("Missing field(s) required: " + message);
  }
  return null;
};

//get all user
router.get('/', (req, res) => {
  res.json(users);
});

//Create new user
router.post('/', (req, res) => {
  if(validateUser(req, res) == null) {
    const user = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email    
    };
  
    users.push(user);
    res.status(201).json(user);
  }
  
});

//get user by Id
router.get('/:id', (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('user not found');
  res.json(user);
});

//update user by Id using patch
router.patch('/:id', (req, res) => {
  const user = users.find(item => item.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  

  res.json(user);
});

//delete user by Id
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(item => item.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

module.exports = router;