import {ProductModel} from '../../models/product.model';
import {ParameterModel} from '../../models/parameter.model';

export interface ProductViewResponse {
  products: ProductModel[];
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalStock: number;

  categories: ParameterModel[];
  unitMeasures: ParameterModel[];
  valuationMethods: ParameterModel[];
}
