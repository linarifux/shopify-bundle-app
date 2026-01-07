import { BUNDLE_RECIPES, COMPONENT_IDS } from '../inventoryConfig.js';

export async function syncAllBundles(client, locationId) {
  console.log("   🔄 Syncing ALL Bundles based on current stock...");

  // 1. Fetch current stock of ALL physical components
  const ids = Object.values(COMPONENT_IDS).join(',');
  const response = await client.get({
    path: 'inventory_levels',
    query: { inventory_item_ids: ids, location_ids: locationId }
  });

  const stockMap = {};
  response.body.inventory_levels.forEach(level => {
    stockMap[level.inventory_item_id] = level.available;
  });

  // 2. Calculate limits for EVERY bundle in your config
  for (const [sku, recipe] of Object.entries(BUNDLE_RECIPES)) {
    let maxSets = 99999;

    // Find the "Weakest Link" component
    for (const comp of recipe.components) {
      const available = stockMap[comp.id] || 0;
      const possible = Math.floor(available / comp.qty);
      if (possible < maxSets) maxSets = possible;
    }

    // 3. Update Shopify
    // We only update if the number is different (optional optimization, but good practice)
    await client.post({
      path: 'inventory_levels/set',
      data: {
        location_id: locationId,
        inventory_item_id: recipe.inventoryItemId,
        available: maxSets
      },
      type: 'application/json',
    });
    console.log(`      -> ${sku} synced to: ${maxSets}`);
  }
}