const express = require('express');
const checkoutController = require('../controllers/checkout.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/checkout', authMiddleware.verifyToken, checkoutController.checkout);

module.exports = router;
