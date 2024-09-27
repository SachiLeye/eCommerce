const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

exports.createOrder = (req, res) => {
  const cart = req.session.cart;
  const userId = req.session.userId;

  if (!cart || cart.items.length === 0) {
    return res.status(400).render('error', { error: 'Your cart is empty' });
  }

  Order.create(userId, cart.totalPrice)
    .then(([result]) => {
      const orderId = result.insertId;
      const orderItems = cart.items.map(item => [orderId, item.id, item.quantity, item.price]);
      return OrderItem.bulkCreate(orderItems);
    })
    .then(() => {
      req.session.cart = null;
      res.render('order-confirmation', { orderId: orderId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to create order' });
    });
};