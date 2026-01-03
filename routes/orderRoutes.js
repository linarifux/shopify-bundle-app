import express from 'express';
import { getAllOrders, handleOrderCreated } from '../controllers/orderController.js';

const router = express.Router();

// View Orders 
router.get('/orders', getAllOrders);

// Webhook Listener (Shopify)
router.post('/webhooks/orders/create', handleOrderCreated);

export default router;