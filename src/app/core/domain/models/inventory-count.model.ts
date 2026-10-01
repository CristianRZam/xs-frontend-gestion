export interface InventoryCountSession {
  id: number;
  countNumber?: string;
  businessDate?: string;
  status: 'OPEN' | 'REVIEW' | 'CLOSED' | 'CANCELLED';
  openedAt?: string;
  openedBy?: number;
  closedAt?: string;
  closedBy?: number;
  totalProducts: number;
  countedProducts: number;
  matchedProducts: number;
  shortageProducts: number;
  surplusProducts: number;
  openingComment?: string;
  closingComment?: string;
}

export interface InventoryCountItem {
  productId: number;
  openingStock: number;
  expectedStock?: number;
  physicalStock?: number;
  difference?: number;
  resultStatus?: 'PENDING' | 'MATCHED' | 'SHORTAGE' | 'SURPLUS';
  differenceReason?: string;
  adjustmentStatus?: string;
}

export interface InventoryCountDetailItem {
  item: InventoryCountItem;
  productName: string;
  productCode: string;
  currentStock: number;
  suggested?: boolean;
  applyAdjustment?: boolean;
  reason?: string;
}

export interface InventoryCountDetail {
  session: InventoryCountSession;
  items: InventoryCountDetailItem[];
}
