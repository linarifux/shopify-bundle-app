// shopifyClient.js
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, Session } from '@shopify/shopify-api'; // Removed LATEST_API_VERSION
import dotenv from 'dotenv';

dotenv.config();

// Initialize the library
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_CLIENT_ID,
  apiSecretKey: process.env.SHOPIFY_SECRET,
  scopes: ['read_products', 'read_orders', 'read_inventory', 'write_inventory'],
  hostName: process.env.SHOP_URL.replace(/https:\/\//, ''),
  apiVersion: '2026-01', // <--- Fixed: Manually set to your dashboard version
  isEmbeddedApp: false,
});

export async function getSession() {
  const url = `https://${process.env.SHOP_URL}/admin/oauth/access_token`;
  
  // 1. Manually request the token using your credentials
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_SECRET,
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();

  if (!data.access_token) {
    console.error("Token Error:", data);
    throw new Error(`Failed to get token: ${JSON.stringify(data)}`);
  }

  // 2. Wrap it in a Session object so the library accepts it
  const session = new Session({
    id: 'offline_' + process.env.SHOP_URL,
    shop: process.env.SHOP_URL,
    state: 'state',
    isOnline: false,
    accessToken: data.access_token
  });

  return session;
}

export default shopify;