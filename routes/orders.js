const express = require('express');
const orders = require('../data/orders');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  const order = {
    id: orders.length + 1,
    userId: req.body.userId,
    orderItems: req.body.orderItems,
    total: req.body.total,
    status: req.body.status,
    
  };
  orders.push(order);
  res.status(201).json(order);
});

router.get('/:id', (req, res) => {
  const order = orders.find(item => item.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

router.put('/:id', (req, res) => {
  const order = orders.find(item => item.id === parseInt(req.params.id));
  if (!order) return res.status(404).send('Order not found');

  order.userId = req.body.userId || order.userId;
  order.orderItems = req.body.orderItems || order.orderItems;
  order.total = req.body.total || order.total;
  order.status = req.body.status || order.status;

  res.json(order);
});

router.delete('/:id', (req, res) => {
  const orderIndex = orders.findIndex(item => item.id === parseInt(req.params.id));
  if (orderIndex === -1) return res.status(404).send('Order not found');

  const deletedOrder = orders.splice(orderIndex, 1);
  res.json(deletedOrder[0]);
});

module.exports = router;
