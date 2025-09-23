import { Observable } from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {UserViewRequest} from '../dtos/resquests/user-view.request';
import {UserViewResponse} from '../dtos/responses/user-view.response';
import {UserFormResponse} from '../dtos/responses/user-form.response';
import {UserFormRequest} from '../dtos/resquests/user-form.request';
import {UserRequest} from '../dtos/resquests/user.request';
import {UserModel} from '../models/user.model';

export abstract class UserRepository {
  abstract init(request: UserViewRequest): Observable<ApiResponse<UserViewResponse>>;
  abstract initForm(request: UserFormRequest): Observable<ApiResponse<UserFormResponse>>;
  abstract create(request: UserRequest): Observable<ApiResponse<UserModel>>;
  abstract update(request: UserRequest): Observable<ApiResponse<UserModel>>;
  abstract delete(id: number): Observable<ApiResponse<boolean>>;
  abstract updateStatus(id: number): Observable<ApiResponse<boolean>>;
  abstract exportPdf(request: UserViewRequest): Observable<Blob>;
  abstract exportExcel(request: UserViewRequest): Observable<Blob>;
}
