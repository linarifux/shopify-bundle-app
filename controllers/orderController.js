import shopify, { getSession } from "../shopifyConfig.js";

export const getAllOrders = async (req, res) => {
  try {
    const session = await getSession();
    const client = new shopify.clients.Rest({ session });

    // Fetch the last 50 orders (status='any' gets open and closed/archived)
    const response = await client.get({
      path: 'orders',
      query: { 
        status: 'any', 
        limit: 50,
        fields: 'id,name,created_at,line_items,financial_status' // Only get fields we need
      },
    });

    const orders = response.body.orders;

    // Simplify the data for easier reading
    const simplifiedData = orders.map(order => ({
      order_number: order.name,
      id: order.id,
      date: order.created_at,
      payment: order.financial_status,
      // This is the CRITICAL part for your inventory logic:
      items: order.line_items.map(item => ({
        sku: item.sku,       // e.g., "SET-RELIEF-GEL-T1"
        quantity: item.quantity,
        variant_id: item.variant_id
      }))
    }));

    res.status(200).json({
      count: orders.length,
      data: simplifiedData
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
};