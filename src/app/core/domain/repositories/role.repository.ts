import { Observable } from 'rxjs';
import {RoleViewRequest} from '../dtos/resquests/role-view.request';
import {RoleModel} from '../models/role.model';
import {ApiResponse} from '../dtos/responses/api.response';

export abstract class RoleRepository {
  abstract init(request: RoleViewRequest): Observable<ApiResponse<any>>;
  abstract getRoleById(id: number): Observable<ApiResponse<any>>;
  abstract create(request: RoleModel): Observable<ApiResponse<any>>;
  abstract update(request: RoleModel): Observable<ApiResponse<any>>;
  abstract delete(id: number): Observable<ApiResponse<any>>;
}
