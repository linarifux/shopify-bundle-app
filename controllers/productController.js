import shopify, { getSession } from '../shopifyConfig.js';

export const getAllProducts = async (req, res) => {
  try {
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });

    // Fetch products - limit to 250 for demo purposes
    const response = await client.get({
      path: 'products',
      query: { limit: 250, status: 'active' },
    });

    const allProducts = response.body.products;

    const relevantItems = allProducts.map(product => {
      return {
        title: product.title,
        variants: product.variants.map(v => ({
          id: v.id,              
          sku: v.sku,            
          inventory_item_id: v.inventory_item_id, 
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