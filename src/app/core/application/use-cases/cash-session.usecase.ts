import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../domain/dtos/responses/api.response';
import { PageResponse } from '../../domain/dtos/responses/page.response';
import { CashSessionCloseRequest, CashSessionOpenRequest } from '../../domain/dtos/resquests/cash-session.request';
import { CashSessionModel } from '../../domain/models/cash-session.model';
import { CashSessionRepository } from '../../domain/repositories/cash-session.repository';

@Injectable({ providedIn: 'root' })
export class CashSessionUseCase {
  constructor(private readonly repository: CashSessionRepository) {}

  open(request: CashSessionOpenRequest): Observable<ApiResponse<CashSessionModel>> { return this.repository.open(request); }
  getCurrent(): Observable<ApiResponse<CashSessionModel>> { return this.repository.getCurrent(); }
  existsOpen(): Observable<ApiResponse<boolean>> { return this.repository.existsOpen(); }
  close(id: number, request: CashSessionCloseRequest): Observable<ApiResponse<CashSessionModel>> { return this.repository.close(id, request); }
  getHistory(page: number, size: number): Observable<ApiResponse<PageResponse<CashSessionModel>>> { return this.repository.getHistory(page, size); }
}
