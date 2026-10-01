import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/domain/dtos/responses/api.response';
import { CashSessionSalesSummary } from '../../core/domain/dtos/responses/cash-session-sales-summary.response';
import { SaleRepository } from '../../core/domain/repositories/sale.repository';
import { PageResponse } from '../../core/domain/dtos/responses/page.response';
import { SaleCancellationRequest } from '../../core/domain/dtos/resquests/commerce.request';
import { SaleModel } from '../../core/domain/models/commerce.model';

@Injectable({ providedIn: 'root' })
export class SaleService implements SaleRepository {
  private readonly baseUrl = `${environment.API_URL}/sales`;

  constructor(private readonly http: HttpClient) {}

  getCashSessionSummary(cashSessionId: number): Observable<ApiResponse<CashSessionSalesSummary>> {
    return this.http.get<ApiResponse<CashSessionSalesSummary>>(`${this.baseUrl}/cash-session/${cashSessionId}`);
  }
  getPage(page: number, size: number, fromDate?: string, toDate?: string): Observable<ApiResponse<PageResponse<SaleModel>>>{ const params: Record<string, string | number> = { page, size }; if (fromDate) params['fromDate'] = fromDate; if (toDate) params['toDate'] = toDate; return this.http.get<ApiResponse<PageResponse<SaleModel>>>(this.baseUrl, { params }); }
  getById(id: number): Observable<ApiResponse<SaleModel>> { return this.http.get<ApiResponse<SaleModel>>(`${this.baseUrl}/${id}`); }
  cancel(id: number, request: SaleCancellationRequest): Observable<ApiResponse<SaleModel>> { return this.http.post<ApiResponse<SaleModel>>(`${this.baseUrl}/${id}/cancel`, request); }
  create(request: Omit<SaleModel, 'id' | 'saleNumber' | 'subtotal' | 'total' | 'status'>): Observable<ApiResponse<SaleModel>> { return this.http.post<ApiResponse<SaleModel>>(this.baseUrl, request); }
}
