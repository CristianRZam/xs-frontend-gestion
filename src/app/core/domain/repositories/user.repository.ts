import { Observable } from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {UserViewRequest} from '../dtos/resquests/user-view.request';
import {UserViewResponse} from '../dtos/responses/user-view.response';
import {UserFormResponse} from '../dtos/responses/user-form.response';
import {UserFormRequest} from '../dtos/resquests/user-form.request';

export abstract class UserRepository {
  abstract init(request: UserViewRequest): Observable<ApiResponse<UserViewResponse>>;
  abstract initForm(request: UserFormRequest): Observable<ApiResponse<UserFormResponse>>;
}
