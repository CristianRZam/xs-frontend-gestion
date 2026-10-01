export interface InventoryCountEntryRequest {
  productId: number;
  physicalStock: number;
  applyAdjustment: boolean;
  reason?: string;
}

export interface InventoryCountCloseRequest {
  closingComment?: string;
  items: InventoryCountEntryRequest[];
}
