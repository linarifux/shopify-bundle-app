# Shopify Bundle Inventory Manager

A custom Node.js application that automates inventory synchronization between **Bundle Products** (Sets) and their individual **Component SKUs** (Parts).

## 🚀 Features

* **Real-time Deduction:** Automatically deducts individual components (e.g., Seat Cushion, Back Cushion) when a Bundle Set (T1, T2, T3) is sold.
* **Dynamic Availability:** Recalculates the maximum available quantity for all bundles based on the lowest common denominator of their components.
* **Hierarchical Logic:** Supports complex T1 (1 set), T2 (2 sets), and T3 (3 sets) ratios using specific Gel vs. Standard material rules.
* **Auto-Authentication:** Uses Shopify's 2026 Client Credentials flow to automatically fetch and rotate access tokens (no manual token updates required).

## 📋 Prerequisites

* Node.js (v18 or higher)
* A Shopify Store with a **Custom App** installed.

## 🛠 Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd bundle-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the root directory and add your Shopify credentials. 

**Note:** Use the internal `.myshopify.com` domain found in *Settings > Domains*, not your public custom domain.

```env
SHOPIFY_CLIENT_ID=your_client_id_here
SHOPIFY_SECRET=your_client_secret_here
SHOP_URL=d3tchd-av.myshopify.com
PORT=3000
```

🏃‍♂️ Usage
Development Mode (Auto-restart on save):

Bash
npm run dev
Production Start:

Bash
node server.js
🔌 API Endpoints
Method	Endpoint	Description
GET	/test-connection	Verifies Shopify API connection and fetches 5 products.
POST	/webhooks/orders/create	Triggered by Shopify when an order is placed (Deduction Logic).
POST	/webhooks/inventory_levels/update	Triggered when stock changes (Sync Logic).
📦 Bundle Logic Example
The app calculates bundle stock based on the "weakest link" in your inventory:

Scenario: You have 104 Seat Cushions and 101 Back Cushions.

Bundle T1 (Requires 1 of each): Availability = 101 (Limited by Back Cushions).

Bundle T2 (Requires 2 of each): Availability = floor(101 / 2) = 50.

🛡 License
ISC