const express = require('express');
const orders = require('../data/orders');
const router = express.Router();

//validate order middleware
const validateOrder = (req, res) => {
  const { userId, orderItems, total, status } = req.body;
  let message = "";
  if (!userId) {
    message += 'userId, ';
  }
  if (!orderItems) {
    message += 'orderItems, ';
  }
  if (!total) {
    message += 'total, ';
  }
  if (!status) {
    message += 'status.';
  }
  if(message != "") {
    return res.status(400).send("Missing field(s) required: " + message);
  }
  return null;
};

//get all oders
router.get('/', (req, res) => {
  res.json(orders);
});

// create new order
router.post('/', (req, res) => {
  if(validateOrder(req,res) == null) {
    const order = {
      id: orders.length + 1,
      userId: req.body.userId,
      orderItems: req.body.orderItems,
      total: req.body.total,
      status: req.body.status,
      
    };
    orders.push(order);
    res.status(201).json(order);
  }
  
});

// get order by Id
router.get('/:id', (req, res) => {
  const order = orders.find(item => item.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

// update order by Id using put
router.put('/:id', (req, res) => {
  const order = orders.find(item => item.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');

  order.userId = req.body.userId || order.userId;
  order.orderItems = req.body.orderItems || order.orderItems;
  order.total = req.body.total || order.total;
  order.status = req.body.status || order.status;

  res.json(order);
});

//delete order by id
router.delete('/:id', (req, res) => {
  const orderIndex = orders.findIndex(item => item.id === parseInt(req.params.id));
  if (orderIndex === -1) return res.status(404).send('Order not found');

  const deletedOrder = orders.splice(orderIndex, 1);
  res.json(deletedOrder[0]);
});

module.exports = router;