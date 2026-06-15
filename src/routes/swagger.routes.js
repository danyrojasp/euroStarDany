const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const swaggerController = require('../controllers/swagger.controller');

const router = express.Router();

router.get('/swagger', swaggerController.getSwagger);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
