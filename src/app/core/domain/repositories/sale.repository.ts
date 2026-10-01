import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/responses/api.response';
import { CashSessionSalesSummary } from '../dtos/responses/cash-session-sales-summary.response';
import { PageResponse } from '../dtos/responses/page.response';
import { SaleCancellationRequest } from '../dtos/resquests/commerce.request';
import { SaleModel } from '../models/commerce.model';

export abstract class SaleRepository {
  abstract getCashSessionSummary(cashSessionId: number): Observable<ApiResponse<CashSessionSalesSummary>>;
  abstract getPage(page: number, size: number, fromDate?: string, toDate?: string): Observable<ApiResponse<PageResponse<SaleModel>>>;
  abstract getById(id: number): Observable<ApiResponse<SaleModel>>;
  abstract cancel(id: number, request: SaleCancellationRequest): Observable<ApiResponse<SaleModel>>;
  abstract create(request: Omit<SaleModel, 'id' | 'saleNumber' | 'subtotal' | 'total' | 'status'>): Observable<ApiResponse<SaleModel>>;
}
