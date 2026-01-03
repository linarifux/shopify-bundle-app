import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes); 

app.get('/', (req, res) => {
  res.send('Bundle Inventory App is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});