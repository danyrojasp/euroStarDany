const checkoutService = require('../services/checkout.service');

exports.checkout = (req, res) => {
  const { paymentMethod, items } = req.body;
  const result = checkoutService.processCheckout({ paymentMethod, items, user: req.user });

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }

  return res.status(200).json(result);
};
