import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/responses/api.response';
import { InventoryCountCloseRequest } from '../dtos/resquests/inventory-count.request';
import { InventoryCountDetail, InventoryCountSession } from '../models/inventory-count.model';

export abstract class InventoryCountRepository {
  abstract current(): Observable<ApiResponse<InventoryCountSession | null>>;
  abstract open(comment?: string): Observable<ApiResponse<InventoryCountSession>>;
  abstract detail(id: number): Observable<ApiResponse<InventoryCountDetail>>;
  abstract review(id: number, request: InventoryCountCloseRequest): Observable<ApiResponse<InventoryCountDetail>>;
  abstract close(id: number, request: InventoryCountCloseRequest): Observable<ApiResponse<InventoryCountSession>>;
  abstract history(): Observable<ApiResponse<InventoryCountSession[]>>;
}
