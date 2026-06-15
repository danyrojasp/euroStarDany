const products = require('../models/products.model');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];

exports.processCheckout = ({ paymentMethod, items, user }) => {
  if (!user) {
    return { success: false, message: 'Authentication required.' };
  }
  if (!paymentMethod || !VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    return { success: false, message: 'Payment method must be cash or credit_card.' };
  }
  if (!Array.isArray(items) || items.length === 0) {
    return { success: false, message: 'Checkout items are required.' };
  }

  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = products.find((productItem) => productItem.id === item.productId);
    if (!product) {
      return { success: false, message: `Product with id ${item.productId} not found.` };
    }
    const quantity = Number(item.quantity) || 1;
    const totalPrice = product.price * quantity;
    subtotal += totalPrice;
    orderItems.push({ productId: product.id, name: product.name, quantity, unitPrice: product.price, totalPrice });
  }

  const discount = paymentMethod === 'cash' ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return {
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
    paymentMethod,
    subtotal,
    discount,
    total,
    items: orderItems,
    message: paymentMethod === 'cash' ? 'Cash discount applied.' : 'No discount applied.'
  };
};
