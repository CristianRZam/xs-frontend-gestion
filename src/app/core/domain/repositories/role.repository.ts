import { Observable } from 'rxjs';
import {RoleViewRequest} from '../dtos/resquests/role-view.request';
import {RoleModel} from '../models/role.model';
import {ApiResponse} from '../dtos/responses/api.response';
import {RoleViewResponse} from '../dtos/responses/role-view.response';

export abstract class RoleRepository {
  abstract init(request: RoleViewRequest): Observable<ApiResponse<RoleViewResponse>>;
  abstract getRoleById(id: number): Observable<ApiResponse<RoleModel>>;
  abstract create(request: RoleModel): Observable<ApiResponse<RoleModel>>;
  abstract update(request: RoleModel): Observable<ApiResponse<RoleModel>>;
  abstract delete(id: number): Observable<ApiResponse<boolean>>;
  abstract updateStatus(id: number): Observable<ApiResponse<boolean>>;
  abstract exportPdf(request: RoleViewRequest): Observable<Blob>;
  abstract exportExcel(request: RoleViewRequest): Observable<Blob>;
}
