import {ProductRequest} from './product.request';
import {ProductImageDTO} from '../product-image.dto';

export interface ProductPayloadRequest {
  product: ProductRequest;
  // Nuevas imágenes a subir
  images?: File[];

  /**
   * Imágenes existentes que se conservarán.
   * Las que no estén en este arreglo se consideran eliminadas
   * ya que fueron removidas desde el frontend.
   */
  imagesToKeep?: ProductImageDTO[];

  mainImageKey?: string | number | null;
}
