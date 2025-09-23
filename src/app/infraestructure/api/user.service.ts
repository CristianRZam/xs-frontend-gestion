import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';
import {UserViewRequest} from '../../core/domain/dtos/resquests/user-view.request';
import {UserViewResponse} from '../../core/domain/dtos/responses/user-view.response';
import {UserRepository} from '../../core/domain/repositories/user.repository';
import {UserFormResponse} from '../../core/domain/dtos/responses/user-form.response';
import {UserFormRequest} from '../../core/domain/dtos/resquests/user-form.request';
import { UserRequest } from "../../core/domain/dtos/resquests/user.request";
import { UserModel } from "../../core/domain/models/user.model";

@Injectable({providedIn: 'root'})
export class UserService implements UserRepository {
  private baseUrl = `${environment.API_URL}/user`;

  constructor(private http: HttpClient) {
  }

  init(request: UserViewRequest): Observable<ApiResponse<UserViewResponse>> {
    return this.http.post<ApiResponse<UserViewResponse>>(`${this.baseUrl}/init`, request);
  }

  initForm(request: UserFormRequest): Observable<ApiResponse<UserFormResponse>> {
    return this.http.post<ApiResponse<UserFormResponse>>(`${this.baseUrl}/init-form`, request);
  }

  create(request: UserRequest): Observable<ApiResponse<UserModel>> {
    return this.http.post<ApiResponse<UserModel>>(
      `${this.baseUrl}/create`,
      request
    );
  }

  update(request: UserRequest): Observable<ApiResponse<UserModel>> {
    return this.http.put<ApiResponse<UserModel>>(
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

  exportPdf(request: UserViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-pdf`, request, {
      responseType: 'blob',
    });
  }

  exportExcel(request: UserViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-excel`, request, {
      responseType: 'blob',
    });
  }

}
