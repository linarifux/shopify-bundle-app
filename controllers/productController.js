import shopify, { getSession } from '../shopifyConfig.js';

export const getAllProducts = async (req, res) => {
  try {
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });

    // Fetch products (limit 50 to be safe, you can increase to 250)
    const response = await client.get({
      path: 'products',
      query: { limit: 250, status: 'active' },
    });

    const allProducts = response.body.products;

    // Optional: Filter to show only your specific Inventory Items
    // This helps you find the IDs you need for your config later
    const relevantItems = allProducts.map(product => {
      return {
        title: product.title,
        variants: product.variants.map(v => ({
          id: v.id,              // <--- THIS IS THE ID YOU NEED
          sku: v.sku,            // <--- "SET-RELIEF-GEL-T1", "CUSH-SEAT-GEL"
          inventory_item_id: v.inventory_item_id, // <--- IMPORTANT FOR STOCK UPDATES
          inventory_quantity: v.inventory_quantity
        }))
      };
    });

    res.status(200).json({
      message: 'Successfully fetched products',
      count: allProducts.length,
      data: relevantItems
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
};