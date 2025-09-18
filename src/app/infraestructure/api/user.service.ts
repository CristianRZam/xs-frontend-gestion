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

@Injectable({ providedIn: 'root' })
export class UserService implements UserRepository {
  private baseUrl = `${environment.API_URL}/user`;

  constructor(private http: HttpClient) {}

  init(request: UserViewRequest): Observable<ApiResponse<UserViewResponse>> {
    return this.http.post<ApiResponse<UserViewResponse>>(`${this.baseUrl}/init`, request);
  }

  initForm(request: UserFormRequest): Observable<ApiResponse<UserFormResponse>> {
    return this.http.post<ApiResponse<UserFormResponse>>(`${this.baseUrl}/init-form`, request);
  }

}
