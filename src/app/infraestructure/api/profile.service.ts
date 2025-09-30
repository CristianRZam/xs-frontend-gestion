import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';
import {ProfileRepository} from '../../core/domain/repositories/profile.repository';
import {ProfileViewResponse} from '../../core/domain/dtos/responses/profile-view.response';
import {ProfileFormResponse} from '../../core/domain/dtos/responses/profile-form.response';
import {ProfileDto} from '../../core/domain/dtos/responses/profile-dto';
import {ProfileRequest} from '../../core/domain/dtos/resquests/profile.request';
import {PasswordRequest} from '../../core/domain/dtos/resquests/password.request';
import {PermissionModel} from '../../core/domain/models/permission.model';

@Injectable({ providedIn: 'root' })
export class ProfileService implements ProfileRepository {
  private baseUrl = `${environment.API_URL}/profile`;

  constructor(private http: HttpClient) {}

  init(): Observable<ApiResponse<ProfileViewResponse>> {
    return this.http.get<ApiResponse<ProfileViewResponse>>(`${this.baseUrl}/init`, {});
  }

  initForm(): Observable<ApiResponse<ProfileFormResponse>> {
    return this.http.get<ApiResponse<ProfileFormResponse>>(`${this.baseUrl}/init-form`, {});
  }

  update(request: ProfileRequest): Observable<ApiResponse<ProfileDto>> {
    return this.http.put<ApiResponse<ProfileDto>>(
      `${this.baseUrl}/update`,
      request
    );
  }

  updatePassword(request: PasswordRequest): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.baseUrl}/update-password`,
      request
    );
  }

  disableAccount(): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.baseUrl}/disable-account`,
      {}
    );
  }

  uploadAvatar(formData: FormData): Observable<ApiResponse<ProfileDto>> {
    return this.http.post<ApiResponse<ProfileDto>>(
      `${this.baseUrl}/upload-avatar`,
      formData
    );
  }

  deleteAvatar(): Observable<ApiResponse<ProfileDto>> {
    return this.http.delete<ApiResponse<ProfileDto>>(
      `${this.baseUrl}/delete-avatar`
    );
  }

  loadMyPermissions(): Observable<ApiResponse<PermissionModel[]>> {
    return this.http.get<ApiResponse<PermissionModel[]>>(`${this.baseUrl}/permissions`, {});
  }

}
