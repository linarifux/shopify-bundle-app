import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the Library
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_CLIENT_ID,
  apiSecretKey: process.env.SHOPIFY_SECRET,
  scopes: ['read_products', 'read_orders', 'read_inventory', 'write_inventory'],
  hostName: process.env.SHOP_URL.replace(/https:\/\//, ''),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

// Helper: Get an Authenticated Session automatically
// This uses the Client Credentials flow (New 2026 Standard)
export async function getShopifySession() {
  // 1. Request a fresh token using Client ID + Secret
  // Note: specific library syntax may vary slightly by version, 
  // but essentially we create a session with the credentials directly.
  
  const sessionId = shopify.session.getOfflineId(process.env.SHOP_URL);
  const session = new Session({
    id: sessionId,
    shop: process.env.SHOP_URL,
    state: 'state',
    isOnline: false,
  });

  // For Client Credentials, we often just need a valid client created
  // If you grabbed the permanent token via CURL, put it in .env as ACCESS_TOKEN
  // logic below assumes you have that permanent token or a way to fetch it.
  
  session.accessToken = process.env.ACCESS_TOKEN; 
  return session;
}

export default shopify;