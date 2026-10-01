import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../domain/dtos/responses/api.response';
import { InventoryCountCloseRequest } from '../../domain/dtos/resquests/inventory-count.request';
import { InventoryCountDetail, InventoryCountSession } from '../../domain/models/inventory-count.model';
import { InventoryCountRepository } from '../../domain/repositories/inventory-count.repository';

@Injectable({ providedIn: 'root' })
export class InventoryCountUseCase {
  constructor(private readonly repository: InventoryCountRepository) {}

  current(): Observable<ApiResponse<InventoryCountSession | null>> { return this.repository.current(); }
  open(comment?: string): Observable<ApiResponse<InventoryCountSession>> { return this.repository.open(comment); }
  detail(id: number): Observable<ApiResponse<InventoryCountDetail>> { return this.repository.detail(id); }
  review(id: number, request: InventoryCountCloseRequest): Observable<ApiResponse<InventoryCountDetail>> { return this.repository.review(id, request); }
  close(id: number, request: InventoryCountCloseRequest): Observable<ApiResponse<InventoryCountSession>> { return this.repository.close(id, request); }
  history(): Observable<ApiResponse<InventoryCountSession[]>> { return this.repository.history(); }
}
