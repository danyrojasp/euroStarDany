const express = require('express');
const authRoutes = require('./routes/auth.routes');
const checkoutRoutes = require('./routes/checkout.routes');
const healthRoutes = require('./routes/health.routes');
const swaggerRoutes = require('./routes/swagger.routes');

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', healthRoutes);
app.use('/api', swaggerRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`E-commerce API running on port ${PORT}`);
});
