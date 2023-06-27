const express = require("express");
const router = express.Router();
const { getOrder, createOrder } = require('../database/orders')

router.get('/:reference', async (req, res) => {
  const order = await getOrder(req.params.reference)
  res.send({status: "OK", data: order});
});

router.post('/', async (req, res) => {
  const orderDate = req.body
  //should validate data ^^
  orderDate.ref = (Math.random() + 1).toString(36).substring(7);

  const newOrder = await createOrder(orderDate)
  res.status(201).send({ status: "OK", data: newOrder });
});

module.exports = router
