import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/responses/api.response';
import { PageResponse } from '../dtos/responses/page.response';
import { CashSessionCloseRequest, CashSessionOpenRequest } from '../dtos/resquests/cash-session.request';
import { CashSessionModel } from '../models/cash-session.model';

export abstract class CashSessionRepository {
  abstract open(request: CashSessionOpenRequest): Observable<ApiResponse<CashSessionModel>>;
  abstract getCurrent(): Observable<ApiResponse<CashSessionModel>>;
  abstract existsOpen(): Observable<ApiResponse<boolean>>;
  abstract close(id: number, request: CashSessionCloseRequest): Observable<ApiResponse<CashSessionModel>>;
  abstract getHistory(page: number, size: number): Observable<ApiResponse<PageResponse<CashSessionModel>>>;
}
