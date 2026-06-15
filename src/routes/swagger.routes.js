const express = require('express');
const swaggerController = require('../controllers/swagger.controller');

const router = express.Router();

router.get('/swagger', swaggerController.getSwagger);

module.exports = router;
