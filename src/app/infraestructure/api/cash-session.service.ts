import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/domain/dtos/responses/api.response';
import { PageResponse } from '../../core/domain/dtos/responses/page.response';
import { CashSessionCloseRequest, CashSessionOpenRequest } from '../../core/domain/dtos/resquests/cash-session.request';
import { CashSessionModel } from '../../core/domain/models/cash-session.model';
import { CashSessionRepository } from '../../core/domain/repositories/cash-session.repository';

@Injectable({ providedIn: 'root' })
export class CashSessionService implements CashSessionRepository {
  private readonly baseUrl = `${environment.API_URL}/cash-session`;

  constructor(private readonly http: HttpClient) {}

  open(request: CashSessionOpenRequest): Observable<ApiResponse<CashSessionModel>> {
    return this.http.post<ApiResponse<CashSessionModel>>(`${this.baseUrl}/open`, request);
  }

  getCurrent(): Observable<ApiResponse<CashSessionModel>> {
    return this.http.get<ApiResponse<CashSessionModel>>(`${this.baseUrl}/current`);
  }

  existsOpen(): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(`${this.baseUrl}/exists-open`);
  }

  close(id: number, request: CashSessionCloseRequest): Observable<ApiResponse<CashSessionModel>> {
    let params = new HttpParams().set('closingAmount', request.closingAmount);
    if (request.closingComment) params = params.set('closingComment', request.closingComment);
    return this.http.put<ApiResponse<CashSessionModel>>(`${this.baseUrl}/close/${id}`, null, { params });
  }

  getHistory(page: number, size: number): Observable<ApiResponse<PageResponse<CashSessionModel>>> {
    return this.http.get<ApiResponse<PageResponse<CashSessionModel>>>(`${this.baseUrl}/history`, { params: { page, size } });
  }
}
