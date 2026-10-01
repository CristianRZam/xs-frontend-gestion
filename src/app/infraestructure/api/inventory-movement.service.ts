import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/domain/dtos/responses/api.response';
import { InventoryMovementPage } from '../../core/domain/models/inventory-movement.model';
import { InventoryMovementRepository } from '../../core/domain/repositories/inventory-movement.repository';

@Injectable({ providedIn: 'root' })
export class InventoryMovementService implements InventoryMovementRepository {
  private readonly baseUrl = `${environment.API_URL}/inventory-movement`;
  constructor(private readonly http: HttpClient) {}
  findByProduct(productId: number, page: number, size: number): Observable<ApiResponse<InventoryMovementPage>> { return this.http.get<ApiResponse<InventoryMovementPage>>(`${this.baseUrl}/product/${productId}`, { params: { page, size } }); }
}
