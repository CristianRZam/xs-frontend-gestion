import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../domain/dtos/responses/api.response';
import { CashSessionSalesSummary } from '../../domain/dtos/responses/cash-session-sales-summary.response';
import { SaleRepository } from '../../domain/repositories/sale.repository';
import { PageResponse } from '../../domain/dtos/responses/page.response';
import { SaleCancellationRequest } from '../../domain/dtos/resquests/commerce.request';
import { SaleModel } from '../../domain/models/commerce.model';

@Injectable({ providedIn: 'root' })
export class SaleUseCase {
  constructor(private readonly repository: SaleRepository) {}

  getCashSessionSummary(cashSessionId: number): Observable<ApiResponse<CashSessionSalesSummary>> {
    return this.repository.getCashSessionSummary(cashSessionId);
  }
  getPage(page: number, size: number, fromDate?: string, toDate?: string): Observable<ApiResponse<PageResponse<SaleModel>>> { return this.repository.getPage(page, size, fromDate, toDate); }
  getById(id: number): Observable<ApiResponse<SaleModel>> { return this.repository.getById(id); }
  cancel(id: number, request: SaleCancellationRequest): Observable<ApiResponse<SaleModel>> { return this.repository.cancel(id, request); }
  create(request: Omit<SaleModel, 'id' | 'saleNumber' | 'subtotal' | 'total' | 'status'>): Observable<ApiResponse<SaleModel>> { return this.repository.create(request); }
}
