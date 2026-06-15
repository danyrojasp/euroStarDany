const path = require('path');
const fs = require('fs');

exports.getSwagger = (req, res) => {
  const swaggerPath = path.resolve(__dirname, '../../swagger.json');
  const swaggerData = fs.readFileSync(swaggerPath, 'utf-8');
  res.type('application/json').send(swaggerData);
};
