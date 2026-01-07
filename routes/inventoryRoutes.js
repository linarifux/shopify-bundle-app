import express from 'express';
import { handleInventoryUpdate } from '../controllers/inventoryController.js';

const router = express.Router();

// Webhook: Inventory Level Update
router.post('/webhooks/inventory/update', handleInventoryUpdate);

export default router;