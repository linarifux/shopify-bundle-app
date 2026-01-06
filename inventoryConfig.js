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
  // ==========================
  //     RELIEF SET SERIES
  // ==========================
  
  // --- GEL SETS ---
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

  // --- STANDARD SETS ---
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
  },

  // ==========================
  //   INDIVIDUAL (BOGO) DEALS
  // ==========================

  // --- GEL SEAT (BOGO) ---
  'CUSH-SEAT-GEL-1': { // Buy 1 Get 1 (Total 2)
    inventoryItemId: 53752391106927,
    components: [ { id: COMPONENT_IDS.GEL_SEAT, qty: 2, name: "Gel Seat Cushion" } ]
  },
  'CUSH-SEAT-GEL-2': { // Buy 2 Get 2 (Total 4)
    inventoryItemId: 53752398807407,
    components: [ { id: COMPONENT_IDS.GEL_SEAT, qty: 4, name: "Gel Seat Cushion" } ]
  },
  'CUSH-SEAT-GEL-3': { // Buy 3 Get 3 (Total 6)
    inventoryItemId: 53752398840175,
    components: [ { id: COMPONENT_IDS.GEL_SEAT, qty: 6, name: "Gel Seat Cushion" } ]
  },

  // --- GEL BACK (BOGO) ---
  'CUSH-BACK-GEL-1': { // Buy 1 Get 1 (Total 2)
    inventoryItemId: 53752391139695,
    components: [ { id: COMPONENT_IDS.GEL_BACK, qty: 2, name: "Gel Back Cushion" } ]
  },
  'CUSH-BACK-GEL-2': { // Buy 2 Get 2 (Total 4)
    inventoryItemId: 53752398872943,
    components: [ { id: COMPONENT_IDS.GEL_BACK, qty: 4, name: "Gel Back Cushion" } ]
  },
  'CUSH-BACK-GEL-3': { // Buy 3 Get 3 (Total 6)
    inventoryItemId: 53752398905711,
    components: [ { id: COMPONENT_IDS.GEL_BACK, qty: 6, name: "Gel Back Cushion" } ]
  },

  // --- STANDARD SEAT (BOGO) ---
  'CUSH-SEAT-STD-1': { // Buy 1 Get 1 (Total 2)
    inventoryItemId: 53752391172463,
    components: [ { id: COMPONENT_IDS.STD_SEAT, qty: 2, name: "Std Seat Cushion" } ]
  },
  'CUSH-SEAT-STD-2': { // Buy 2 Get 2 (Total 4)
    inventoryItemId: 53752398938479,
    components: [ { id: COMPONENT_IDS.STD_SEAT, qty: 4, name: "Std Seat Cushion" } ]
  },
  'CUSH-SEAT-STD-3': { // Buy 3 Get 3 (Total 6)
    inventoryItemId: 53752398971247,
    components: [ { id: COMPONENT_IDS.STD_SEAT, qty: 6, name: "Std Seat Cushion" } ]
  },

  // --- STANDARD BACK (BOGO) ---
  'CUSH-BACK-STD-1': { // Buy 1 Get 1 (Total 2)
    inventoryItemId: 53752391205231,
    components: [ { id: COMPONENT_IDS.STD_BACK, qty: 2, name: "Std Back Cushion" } ]
  },
  'CUSH-BACK-STD-2': { // Buy 2 Get 2 (Total 4)
    inventoryItemId: 53752399004015,
    components: [ { id: COMPONENT_IDS.STD_BACK, qty: 4, name: "Std Back Cushion" } ]
  },
  'CUSH-BACK-STD-3': { // Buy 3 Get 3 (Total 6)
    inventoryItemId: 53752399036783,
    components: [ { id: COMPONENT_IDS.STD_BACK, qty: 6, name: "Std Back Cushion" } ]
  }
};