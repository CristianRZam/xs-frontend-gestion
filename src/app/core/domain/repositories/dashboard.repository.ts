import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/responses/api.response';
import { DashboardResponse } from '../dtos/responses/dashboard.response';

export abstract class DashboardRepository {
  abstract getSummary(): Observable<ApiResponse<DashboardResponse>>;
}
