import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoleViewResponse } from '../../core/domain/dtos/responses/role-view.response';
import { RoleRepository } from '../../core/domain/repositories/role.repository';
import {RoleViewRequest} from '../../core/domain/dtos/resquests/role-view.request';
import {RoleModel} from '../../core/domain/models/role.model';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';

@Injectable({ providedIn: 'root' })
export class RoleService implements RoleRepository {
  private baseUrl = `${environment.API_URL}/role`;

  constructor(private http: HttpClient) {}

  init(request: RoleViewRequest): Observable<ApiResponse<RoleViewResponse>> {
    return this.http.post<ApiResponse<RoleViewResponse>>(`${this.baseUrl}/init`, request);
  }

  getRoleById(id: number): Observable<ApiResponse<RoleModel>> {
    return this.http.get<ApiResponse<RoleModel>>(`${this.baseUrl}/get/${id}`);
  }


  create(request: RoleModel): Observable<ApiResponse<RoleModel>> {
    return this.http.post<ApiResponse<RoleModel>>(
      `${this.baseUrl}/create`,
      request
    );
  }

  update(request: RoleModel): Observable<ApiResponse<RoleModel>> {
    return this.http.put<ApiResponse<RoleModel>>(
      `${this.baseUrl}/update`,
      request
    );
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.baseUrl}/delete/${id}`
    );
  }

  updateStatus(id: number): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.baseUrl}/update-status`,
      id
    );
  }

  exportPdf(request: RoleViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-pdf`, request, {
      responseType: 'blob',
    });
  }

  exportExcel(request: RoleViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-excel`, request, {
      responseType: 'blob',
    });
  }

}
