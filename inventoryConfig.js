// inventoryConfig.js

// 1. COMPONENT ID MAPPING (The Physical Items)
export const COMPONENT_IDS = {
  GEL_SEAT: 53650392416623,
  GEL_BACK: 53650392449391,
  STD_SEAT: 53650392482159,
  STD_BACK: 53650392514927,
};

// 2. BUNDLE RECIPES
export const BUNDLE_RECIPES = {
  // --- GEL SERIES ---
  'SET-RELIEF-GEL-T1': {
    inventoryItemId: 53648998531439, 
    components: [
      { id: COMPONENT_IDS.GEL_SEAT, qty: 1, name: "Gel Seat Cushion" },
      { id: COMPONENT_IDS.GEL_BACK, qty: 1, name: "Gel Back Cushion" }
    ]
  },
  'SET-RELIEF-GEL-T2': {
    inventoryItemId: 53648998564207,
    components: [
      { id: COMPONENT_IDS.GEL_SEAT, qty: 2, name: "Gel Seat Cushion" },
      { id: COMPONENT_IDS.GEL_BACK, qty: 2, name: "Gel Back Cushion" }
    ]
  },
  'SET-RELIEF-GEL-T3': {
    inventoryItemId: 53648998596975,
    components: [
      { id: COMPONENT_IDS.GEL_SEAT, qty: 3, name: "Gel Seat Cushion" },
      { id: COMPONENT_IDS.GEL_BACK, qty: 3, name: "Gel Back Cushion" }
    ]
  },

  // --- STANDARD SERIES ---
  'SET-RELIEF-STD-T1': {
    inventoryItemId: 53648998629743,
    components: [
      { id: COMPONENT_IDS.STD_SEAT, qty: 1, name: "Std Seat Cushion" },
      { id: COMPONENT_IDS.STD_BACK, qty: 1, name: "Std Back Cushion" }
    ]
  },
  'SET-RELIEF-STD-T2': {
    inventoryItemId: 53648998662511,
    components: [
      { id: COMPONENT_IDS.STD_SEAT, qty: 2, name: "Std Seat Cushion" },
      { id: COMPONENT_IDS.STD_BACK, qty: 2, name: "Std Back Cushion" }
    ]
  },
  'SET-RELIEF-STD-T3': {
    inventoryItemId: 53648998695279,
    components: [
      { id: COMPONENT_IDS.STD_SEAT, qty: 3, name: "Std Seat Cushion" },
      { id: COMPONENT_IDS.STD_BACK, qty: 3, name: "Std Back Cushion" }
    ]
  }
};