import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse} from '../../domain/dtos/responses/api.response';
import {UserViewRequest} from '../../domain/dtos/resquests/user-view.request';
import {UserRepository} from '../../domain/repositories/user.repository';
import {UserViewResponse} from '../../domain/dtos/responses/user-view.response';
import {UserFormRequest} from '../../domain/dtos/resquests/user-form.request';
import {UserFormResponse} from '../../domain/dtos/responses/user-form.response';
import {UserRequest} from '../../domain/dtos/resquests/user.request';
import {UserModel} from '../../domain/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserUseCase {
  constructor(private readonly repository: UserRepository) {}

  init(request: UserViewRequest): Observable<ApiResponse<UserViewResponse>> {
    return this.repository.init(request);
  }

  initForm(request: UserFormRequest): Observable<ApiResponse<UserFormResponse>> {
    return this.repository.initForm(request);
  }

  create(request: UserRequest): Observable<ApiResponse<UserModel>>  {
    return this.repository.create(request);
  }

  update(request: UserRequest): Observable<ApiResponse<UserModel>>  {
    return this.repository.update(request);
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.repository.delete(id);
  }

  updateStatus(id: number): Observable<ApiResponse<boolean>> {
    return this.repository.updateStatus(id);
  }

  exportPdf(request: UserViewRequest): Observable<Blob> {
    return this.repository.exportPdf(request);
  }

  exportExcel(request: UserViewRequest): Observable<Blob> {
    return this.repository.exportExcel(request);
  }

}
