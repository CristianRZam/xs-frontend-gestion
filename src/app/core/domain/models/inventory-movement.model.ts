export type InventoryMovementType = 'ENTRY' | 'SALE' | 'WASTE' | 'SALE_RETURN' | 'ADJUSTMENT' | string;

export interface InventoryMovement {
  id: number;
  type: InventoryMovementType;
  quantity: number;
  previousStock: number;
  currentStock: number;
  reason?: string;
  referenceType?: string;
  referenceId?: number;
  productId: number;
  productCode?: string;
  productName?: string;
  createdAt: string;
  createdBy?: string;
}

export interface InventoryMovementPage {
  movements: InventoryMovement[];
  totalElements: number;
  page: number;
  size: number;
  hasMore: boolean;
}
