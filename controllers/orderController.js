import shopify, { getSession } from '../shopifyConfig.js';
import { BUNDLE_RECIPES, COMPONENT_IDS } from '../inventoryConfig.js';

// --- EXISTING: Fetch Orders (for viewing) ---
export const getAllOrders = async (req, res) => {
  try {
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });
    const response = await client.get({ path: 'orders', query: { status: 'any', limit: 50, fields: 'id,name,created_at,line_items,financial_status' } });
    
    res.status(200).json({ count: response.body.orders.length, data: response.body.orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
};

// --- NEW: Automation Logic (Triggered by Webhook) ---
export const handleOrderCreated = async (req, res) => {
  try {
    console.log(`\n📦 Order Received: ${req.body.name || 'Unknown'}`);
    
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });
    const order = req.body;
    
    // We need the Location ID to deduct stock (usually the primary location)
    // For this code, we fetch the first active location.
    const locations = await client.get({ path: 'locations' });
    const locationId = locations.body.locations[0].id;

    let componentsUsed = [];
    let bundlesFound = false;

    // 1. DEDUCT COMPONENTS
    for (const lineItem of order.line_items) {
      const recipe = BUNDLE_RECIPES[lineItem.sku];

      if (recipe) {
        bundlesFound = true;
        console.log(`   - Bundle Found: ${lineItem.sku} (Qty: ${lineItem.quantity})`);

        for (const component of recipe.items) {
          const qtyToDeduct = component.qty * lineItem.quantity;
          
          // Add to list for Order Note
          componentsUsed.push(`${qtyToDeduct}x ${component.name}`);

          // Execute Deduction in Shopify
          console.log(`     -> Deducting ${qtyToDeduct} from ID: ${component.id}`);
          await client.post({
            path: 'inventory_levels/adjust',
            data: {
              location_id: locationId,
              inventory_item_id: component.id,
              available_adjustment: -qtyToDeduct // Negative number to subtract
            },
            type: 'application/json',
          });
        }
      }
    }

    if (!bundlesFound) {
      console.log("   - No bundles in this order. Skipping.");
      return res.status(200).send();
    }

    // 2. UPDATE ORDER NOTE
    if (componentsUsed.length > 0) {
      const noteMessage = `Included Components: ${componentsUsed.join(', ')}`;
      console.log(`   - Updating Order Note: "${noteMessage}"`);
      
      await client.put({
        path: `orders/${order.id}`,
        data: { order: { id: order.id, note: noteMessage } }
      });
    }

    // 3. RECALCULATE & SYNC ALL BUNDLES
    // Now that components are gone, we must update the "Available" count for ALL bundles.
    console.log("   - Syncing Bundle Quantities...");
    await syncBundleInventory(client, locationId);

    res.status(200).send();

  } catch (error) {
    console.error('❌ Error processing order:', error);
    res.status(500).send(error.message); // Webhooks will retry if 500 is returned
  }
};

// --- HELPER: Recalculate Logic ---
async function syncBundleInventory(client, locationId) {
  // 1. Fetch fresh stock levels of the 4 components
  // We query them all at once
  const componentIdsStr = Object.values(COMPONENT_IDS).join(',');
  const stockResponse = await client.get({
    path: 'inventory_levels',
    query: { inventory_item_ids: componentIdsStr, location_ids: locationId }
  });

  const levels = {};
  stockResponse.body.inventory_levels.forEach(level => {
    levels[level.inventory_item_id] = level.available;
  });

  // 2. Calculate Max Available for each Bundle
  for (const [sku, recipe] of Object.entries(BUNDLE_RECIPES)) {
    let maxSets = 99999;

    for (const comp of recipe.items) {
      const availableCompStock = levels[comp.id] || 0;
      const possibleFromComp = Math.floor(availableCompStock / comp.qty);
      if (possibleFromComp < maxSets) maxSets = possibleFromComp;
    }

    // 3. Update Shopify Bundle Quantity
    // We use 'set' to overwrite the value absolutely
    await client.post({
      path: 'inventory_levels/set',
      data: {
        location_id: locationId,
        inventory_item_id: recipe.bundleInventoryId,
        available: maxSets
      }
    });
    console.log(`     -> Updated ${sku} to ${maxSets}`);
  }
}