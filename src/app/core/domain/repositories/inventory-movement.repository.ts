import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/responses/api.response';
import { InventoryMovementPage } from '../models/inventory-movement.model';

export abstract class InventoryMovementRepository {
  abstract findByProduct(productId: number, page: number, size: number): Observable<ApiResponse<InventoryMovementPage>>;
}
