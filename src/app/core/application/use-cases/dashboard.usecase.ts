import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../domain/dtos/responses/api.response';
import { DashboardResponse } from '../../domain/dtos/responses/dashboard.response';
import { DashboardRepository } from '../../domain/repositories/dashboard.repository';

@Injectable({ providedIn: 'root' })
export class DashboardUseCase {
  constructor(private readonly repository: DashboardRepository) {}

  getSummary(): Observable<ApiResponse<DashboardResponse>> {
    return this.repository.getSummary();
  }
}
