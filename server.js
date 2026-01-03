import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // <--- 1. Import this

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes); // <--- 2. Add this line

app.get('/', (req, res) => {
  res.send('Bundle Inventory App is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- Products: http://localhost:${PORT}/api/products`);
  console.log(`- Orders:   http://localhost:${PORT}/api/orders`); // <--- 3. Update log
});