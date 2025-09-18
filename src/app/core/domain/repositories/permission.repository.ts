import { Observable } from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {PermissionUpdateRequest} from '../dtos/resquests/permission-update.request';

export abstract class PermissionRepository {
  abstract getByRoleId(id: number): Observable<ApiResponse<any>>;
  abstract updatePermissionByRole(request: PermissionUpdateRequest): Observable<ApiResponse<any>>;
}
