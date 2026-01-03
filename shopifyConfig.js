import '@shopify/shopify-api/adapters/node';
import { shopifyApi, Session } from '@shopify/shopify-api';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the library
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_CLIENT_ID,
  apiSecretKey: process.env.SHOPIFY_SECRET,
  scopes: ['read_products', 'read_orders', 'read_inventory', 'write_inventory'],
  hostName: process.env.SHOP_URL.replace(/https:\/\//, ''),
  apiVersion: '2026-01',
  isEmbeddedApp: false,
});

export async function getSession() {
  // 1. Safety Clean: Remove 'https://' if user accidentally put it in .env
  const shop = process.env.SHOP_URL.replace(/(https?:\/\/)/, '');
  const url = `https://${shop}/admin/oauth/access_token`;
  
  // 2. Request the token
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_SECRET,
      grant_type: 'client_credentials'
    })
  });

  // 3. Better Error Logging (HTML response detection)
  if (!response.ok) {
    const text = await response.text();
    console.error(`\n❌ API Request Failed! Status: ${response.status}`);
    console.error(`Target URL: ${url}`);
    console.error(`Response Body (First 500 chars): ${text.substring(0, 500)}...`);
    throw new Error(`Shopify API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.access_token) {
    console.error("Token Error:", data);
    throw new Error(`Failed to get token: ${JSON.stringify(data)}`);
  }

  // 4. Return Valid Session
  return new Session({
    id: 'offline_' + shop,
    shop: shop,
    state: 'state',
    isOnline: false,
    accessToken: data.access_token
  });
}

export default shopify;