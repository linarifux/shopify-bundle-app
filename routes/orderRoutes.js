import express from 'express';
import { getAllOrders, handleOrderCreated } from '../controllers/orderController.js';

const router = express.Router();

// Route for YOU (View orders in browser)
router.get('/orders', getAllOrders);

// Route for SHOPIFY (Webhook trigger)
// This is the URL you will paste into Shopify Webhook settings
router.post('/webhooks/orders/create', handleOrderCreated);

export default router;