
export interface ProductRequest {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  categoryId?: number;
  unitMeasureId?: number;
  valuationMethodId?: number;
  basePrice?: number;
  promoPrice?: number;
  baseCost?: number;
  totalStock?: number;
}
