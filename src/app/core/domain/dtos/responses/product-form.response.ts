import {ProductModel} from '../../models/product.model';
import {ParameterModel} from '../../models/parameter.model';

export interface ProductFormResponse {
  product?: ProductModel;
  categories?: ParameterModel[];
  unitMeasures?: ParameterModel[];
  valuationMethods?: ParameterModel[];
}
