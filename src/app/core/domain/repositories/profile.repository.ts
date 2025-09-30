import { Observable } from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {ProfileViewResponse} from '../dtos/responses/profile-view.response';
import {ProfileFormResponse} from '../dtos/responses/profile-form.response';
import {ProfileRequest} from '../dtos/resquests/profile.request';
import {ProfileDto} from '../dtos/responses/profile-dto';
import {PasswordRequest} from '../dtos/resquests/password.request';
import {PermissionModel} from '../models/permission.model';

export abstract class ProfileRepository {
  abstract init(): Observable<ApiResponse<ProfileViewResponse>>;

  abstract initForm(): Observable<ApiResponse<ProfileFormResponse>>;

  abstract update(item: ProfileRequest): Observable<ApiResponse<ProfileDto>>;

  abstract updatePassword(item: PasswordRequest): Observable<ApiResponse<boolean>>;

  abstract disableAccount(): Observable<ApiResponse<boolean>>;

  abstract uploadAvatar(formData: FormData): Observable<ApiResponse<ProfileDto>>;

  abstract deleteAvatar(): Observable<ApiResponse<ProfileDto>>;

  abstract loadMyPermissions(): Observable<ApiResponse<PermissionModel[]>>;
}
