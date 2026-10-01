import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/domain/dtos/responses/api.response';
import { DashboardResponse } from '../../core/domain/dtos/responses/dashboard.response';
import { DashboardRepository } from '../../core/domain/repositories/dashboard.repository';

@Injectable({ providedIn: 'root' })
export class DashboardService implements DashboardRepository {
  private readonly baseUrl = `${environment.API_URL}/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<ApiResponse<DashboardResponse>> {
    return this.http.get<ApiResponse<DashboardResponse>>(this.baseUrl);
  }
}
