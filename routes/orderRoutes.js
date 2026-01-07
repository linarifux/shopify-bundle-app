import express from 'express';
import { getAllOrders, handleOrderCancelled, handleOrderCreated } from '../controllers/orderController.js';

const router = express.Router();

// View Orders 
router.get('/orders', getAllOrders);

// Webhook Listener (Shopify)
router.post('/webhooks/orders/create', handleOrderCreated);
router.post('/webhooks/orders/cancelled', handleOrderCancelled); 

export default router;