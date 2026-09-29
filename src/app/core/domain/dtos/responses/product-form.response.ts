import {ProductModel} from '../../models/product.model';
import {ParameterModel} from '../../models/parameter.model';
import {ProductImageDTO} from '../product-image.dto';

export interface ProductFormResponse {
  product?: ProductModel;
  categories?: ParameterModel[];
  unitMeasures?: ParameterModel[];
  valuationMethods?: ParameterModel[];
  images?: ProductImageDTO[];
}
