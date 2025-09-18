import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';
import {PermissionViewResponse} from '../../core/domain/dtos/responses/permission-view.response';
import {PermissionRepository} from '../../core/domain/repositories/permission.repository';
import {PermissionUpdateRequest} from '../../core/domain/dtos/resquests/permission-update.request';

@Injectable({ providedIn: 'root' })
export class PermissionService implements PermissionRepository {
  private baseUrl = `${environment.API_URL}/permission`;

  constructor(private http: HttpClient) {}

  getByRoleId(id: number): Observable<ApiResponse<PermissionViewResponse>> {
    return this.http.get<ApiResponse<PermissionViewResponse>>(`${this.baseUrl}/get-by-role/${id}`);
  }

  updatePermissionByRole(request: PermissionUpdateRequest): Observable<ApiResponse<Boolean>> {
    return this.http.put<ApiResponse<Boolean>>(
      `${this.baseUrl}/update-permission-by-role`,
      request
    );
  }

}
