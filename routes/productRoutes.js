import express from 'express';
import { getAllProducts } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products
router.get('/products', getAllProducts);

export default router;