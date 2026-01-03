// inventoryConfig.js

// 1. Map of Component Inventory IDs (The Physical Items)
export const COMPONENT_IDS = {
  GEL_SEAT: 53650392416623,
  GEL_BACK: 53650392449391,
  STD_SEAT: 53650392482159,
  STD_BACK: 53650392514927,
};

// 2. Map of Bundle Recipes
// Keys = Bundle SKUs
// Values = List of components to deduct + The Bundle's own Inventory ID (to update later)
export const BUNDLE_RECIPES = {
  // --- GEL SERIES ---
  'SET-RELIEF-GEL-T1': {
    bundleInventoryId: 53648998531439,
    items: [
      { id: COMPONENT_IDS.GEL_SEAT, qty: 1, name: "Gel Seat Cushion" },
      { id: COMPONENT_IDS.GEL_BACK, qty: 1, name: "Gel Back Cushion" }
    ]
  },
  'SET-RELIEF-GEL-T2': {
    bundleInventoryId: 53648998564207,
    items: [
      { id: COMPONENT_IDS.GEL_SEAT, qty: 2, name: "Gel Seat Cushion" },
      { id: COMPONENT_IDS.GEL_BACK, qty: 2, name: "Gel Back Cushion" }
    ]
  },
  'SET-RELIEF-GEL-T3': {
    bundleInventoryId: 53648998596975,
    items: [
      { id: COMPONENT_IDS.GEL_SEAT, qty: 3, name: "Gel Seat Cushion" },
      { id: COMPONENT_IDS.GEL_BACK, qty: 3, name: "Gel Back Cushion" }
    ]
  },

  // --- STANDARD SERIES ---
  'SET-RELIEF-STD-T1': {
    bundleInventoryId: 53648998629743,
    items: [
      { id: COMPONENT_IDS.STD_SEAT, qty: 1, name: "Standard Seat Cushion" },
      { id: COMPONENT_IDS.STD_BACK, qty: 1, name: "Standard Back Cushion" }
    ]
  },
  'SET-RELIEF-STD-T2': {
    bundleInventoryId: 53648998662511,
    items: [
      { id: COMPONENT_IDS.STD_SEAT, qty: 2, name: "Standard Seat Cushion" },
      { id: COMPONENT_IDS.STD_BACK, qty: 2, name: "Standard Back Cushion" }
    ]
  },
  'SET-RELIEF-STD-T3': {
    bundleInventoryId: 53648998695279,
    items: [
      { id: COMPONENT_IDS.STD_SEAT, qty: 3, name: "Standard Seat Cushion" },
      { id: COMPONENT_IDS.STD_BACK, qty: 3, name: "Standard Back Cushion" }
    ]
  }
};