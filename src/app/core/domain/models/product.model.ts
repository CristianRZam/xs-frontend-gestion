export interface ProductModel {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  categoryId?: number;
  nameCategory?: string;
  unitMeasureId?: number;
  valuationMethodId?: number;
  nameUnitMeasure?: string;
  manageVariants?: boolean;
  basePrice?: number;
  promoPrice?: number;
  baseCost?: number;
  totalStock?: number;
  active?: boolean;
  deleted?: boolean;
}
