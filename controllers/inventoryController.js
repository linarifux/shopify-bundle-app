import shopify, { getSession } from '../shopifyConfig.js';
import { COMPONENT_IDS } from '../inventoryConfig.js';
import { syncAllBundles } from '../utils/inventorySync.js';

export const handleInventoryUpdate = async (req, res) => {
  try {
    const { inventory_item_id, location_id, available } = req.body;
    
    // 1. Check if the updated item is one of our "Master Components"
    const isComponent = Object.values(COMPONENT_IDS).includes(inventory_item_id);

    if (isComponent) {
      console.log(`\n🔔 Stock Change Detected on Component ID: ${inventory_item_id}`);
      console.log(`   New Quantity: ${available}`);

      // 2. Initialize Client
      const session = await getSession();
      const client = new shopify.clients.Rest({ session });

      // 3. Run the Global Sync
      await syncAllBundles(client, location_id);
    } else {
      // If a Bundle was updated, we ignore it to avoid loops
      // console.log('Update received for non-component. Ignoring.'); 
    }

    res.status(200).send();
  } catch (error) {
    console.error('❌ Inventory Update Error:', error);
    res.status(500).send(error.message);
  }
};