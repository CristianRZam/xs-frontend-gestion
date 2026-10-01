import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/domain/dtos/responses/api.response';
import { InventoryCountCloseRequest } from '../../core/domain/dtos/resquests/inventory-count.request';
import { InventoryCountDetail, InventoryCountSession } from '../../core/domain/models/inventory-count.model';
import { InventoryCountRepository } from '../../core/domain/repositories/inventory-count.repository';

@Injectable({ providedIn: 'root' })
export class InventoryCountService implements InventoryCountRepository {
  private readonly baseUrl = `${environment.API_URL}/inventory-counts`;
  constructor(private readonly http: HttpClient) {}
  current(): Observable<ApiResponse<InventoryCountSession | null>> { return this.http.get<ApiResponse<InventoryCountSession | null>>(`${this.baseUrl}/current`); }
  open(comment?: string): Observable<ApiResponse<InventoryCountSession>> { return this.http.post<ApiResponse<InventoryCountSession>>(this.baseUrl, comment ? { comment } : {}); }
  detail(id: number): Observable<ApiResponse<InventoryCountDetail>> { return this.http.get<ApiResponse<InventoryCountDetail>>(`${this.baseUrl}/${id}`); }
  review(id: number, request: InventoryCountCloseRequest): Observable<ApiResponse<InventoryCountDetail>> { return this.http.put<ApiResponse<InventoryCountDetail>>(`${this.baseUrl}/${id}/review`, request); }
  close(id: number, request: InventoryCountCloseRequest): Observable<ApiResponse<InventoryCountSession>> { return this.http.put<ApiResponse<InventoryCountSession>>(`${this.baseUrl}/${id}/close`, request); }
  history(): Observable<ApiResponse<InventoryCountSession[]>> { return this.http.get<ApiResponse<InventoryCountSession[]>>(this.baseUrl); }
}
