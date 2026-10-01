import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../domain/dtos/responses/api.response';
import { InventoryMovementPage } from '../../domain/models/inventory-movement.model';
import { InventoryMovementRepository } from '../../domain/repositories/inventory-movement.repository';

@Injectable({ providedIn: 'root' })
export class InventoryMovementUseCase {
  constructor(private readonly repository: InventoryMovementRepository) {}
  findByProduct(productId: number, page: number, size: number): Observable<ApiResponse<InventoryMovementPage>> { return this.repository.findByProduct(productId, page, size); }
}
