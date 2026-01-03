// server.js
import express from 'express';
import shopify, { getSession } from './shopifyClient.js';

const app = express();
app.use(express.json());

// --- CONFIGURATION ---
// Define your Bundles and Components
const BUNDLES = {
  // Example: 'BUNDLE-SKU': [ { sku: 'COMPONENT-SKU', qty: 1 } ]
  'SET-RELIEF-GEL-T1': [ { sku: 'CUSH-SEAT-GEL', qty: 1 }, { sku: 'CUSH-BACK-GEL', qty: 1 } ],
  'SET-RELIEF-GEL-T2': [ { sku: 'CUSH-SEAT-GEL', qty: 2 }, { sku: 'CUSH-BACK-GEL', qty: 2 } ]
  // ... Add the rest of your T1/T2/T3 recipes here
};

// --- ROUTE: Check Products (Test your connection) ---
app.get('/test-connection', async (req, res) => {
  try {
    const session = await getSession(); // <--- Auto-logins here
    const client = new shopify.clients.Rest({ session });

    const response = await client.get({ path: 'products', query: { limit: 5 } });
    
    // Simplifies the output for you to read
    let totalProducts = 0
    let totalVaraints = 0
    const products = response.body.products.map(p => ({
      title: p.title,
      variants: p.variants.map(v => ({ id: v.id, sku: v.sku, inventory_item_id: v.inventory_item_id }))
    }));
    response.body.products.forEach(p => {
        totalProducts++
        p.variants.forEach(v => {
            totalVaraints++
        })
    });
    
    res.json({ status: 'Connected!', totalProducts: totalProducts, totalVaraints, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// --- ROUTE: Webhook Listener (Where the magic happens) ---
app.post('/webhooks/inventory-update', async (req, res) => {
  console.log('Inventory update received!');
  // Logic to recalculate stock goes here (we will add this next)
  res.status(200).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));