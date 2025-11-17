export interface ProductViewRequest {
  code?: string;
  name?: string;
  description?: string;
  categories?: number[];
  unitMeasures?: number[];
  valuationMethods?: number[];
  manageVariant?: boolean;
  minimumStock?: number;
  maximumStock?: number;
  status?: boolean;
  page: number;
  size: number;
}
