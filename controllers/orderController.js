import shopify, { getSession } from '../shopifyConfig.js';
import { BUNDLE_RECIPES, COMPONENT_IDS } from '../inventoryConfig.js';

// View Orders 
export const getAllOrders = async (req, res) => {
  try {
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });
    const response = await client.get({
      path: 'orders',
      query: { status: 'any', limit: 20, fields: 'id,name,created_at,line_items' }
    });
    res.status(200).json(response.body.orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Automation Logic (Webhook) ---
export const handleOrderCreated = async (req, res) => {
  try {
    console.log(`\n📦 New Order Received: ${req.body.name}`);
    const order = req.body;
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });

    // 1. Get Location ID 
    const locResponse = await client.get({ path: 'locations' });
    const locationId = locResponse.body.locations[0].id;

    let bundlesFound = false;
    let noteUpdates = [];

    // 2. Loop through items sold
    for (const item of order.line_items) {
      const recipe = BUNDLE_RECIPES[item.sku];

      // If item is a Bundle
      if (recipe) {
        bundlesFound = true;
        console.log(`   👉 Bundle Sold: ${item.sku} (Qty: ${item.quantity})`);

        for (const comp of recipe.components) {
          const deductQty = comp.qty * item.quantity;
          
          // Deduct Component Stock
          console.log(`      - Deducting ${deductQty} x ${comp.name}`);
          await client.post({
            path: 'inventory_levels/adjust',
            data: {
              location_id: locationId,
              inventory_item_id: comp.id,
              available_adjustment: -deductQty 
            },
            type: 'application/json',
          });
          noteUpdates.push(`${deductQty}x ${comp.name}`);
        }
      }
    }

    if (!bundlesFound) {
      console.log("   ✅ No bundles. Skipping.");
      return res.status(200).send();
    }

    // 3. Update Order Note
    if (noteUpdates.length > 0) {
      const noteMessage = `System Deducted: ${noteUpdates.join(', ')}`;
      await client.put({
        path: `orders/${order.id}`,
        data: { order: { id: order.id, note: noteMessage } },
        type: 'application/json',
      });
    }

    // 4. Recalculate ALL Bundles
    await syncAllBundles(client, locationId);

    res.status(200).send();

  } catch (error) {
    console.error('❌ Automation Error:', error);
    res.status(500).send(error.message);
  }
};

// --- Helper Function ---
async function syncAllBundles(client, locationId) {
  console.log("   🔄 Recalculating bundles...");
  const ids = Object.values(COMPONENT_IDS).join(',');
  
  // Get current component stock
  const response = await client.get({
    path: 'inventory_levels',
    query: { inventory_item_ids: ids, location_ids: locationId }
  });

  const stockMap = {};
  response.body.inventory_levels.forEach(level => {
    stockMap[level.inventory_item_id] = level.available;
  });

  // Calculate limits
  for (const [sku, recipe] of Object.entries(BUNDLE_RECIPES)) {
    let maxSets = 9999;
    for (const comp of recipe.components) {
      const available = stockMap[comp.id] || 0;
      const possible = Math.floor(available / comp.qty);
      if (possible < maxSets) maxSets = possible;
    }

    // Update Bundle Stock
    await client.post({
      path: 'inventory_levels/set',
      data: {
        location_id: locationId,
        inventory_item_id: recipe.inventoryItemId,
        available: maxSets
      },
      type: 'application/json',
    });
    console.log(`      -> ${sku}: Set to ${maxSets}`);
  }
}