import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse} from '../../domain/dtos/responses/api.response';
import {ProfileRepository} from '../../domain/repositories/profile.repository';
import {ProfileViewResponse} from '../../domain/dtos/responses/profile-view.response';
import {ProfileFormResponse} from '../../domain/dtos/responses/profile-form.response';
import {ProfileRequest} from '../../domain/dtos/resquests/profile.request';
import {ProfileDto} from '../../domain/dtos/responses/profile-dto';
import {PasswordRequest} from '../../domain/dtos/resquests/password.request';
import {PermissionModel} from '../../domain/models/permission.model';

@Injectable({ providedIn: 'root' })
export class ProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  init(): Observable<ApiResponse<ProfileViewResponse>> {
    return this.profileRepository.init();
  }

  initForm(): Observable<ApiResponse<ProfileFormResponse>> {
    return this.profileRepository.initForm();
  }

  update(item: ProfileRequest): Observable<ApiResponse<ProfileDto>>  {
    return this.profileRepository.update(item);
  }

  updatePassword(item: PasswordRequest): Observable<ApiResponse<boolean>> {
    return this.profileRepository.updatePassword(item);
  }

  disableAccount(): Observable<ApiResponse<boolean>> {
    return this.profileRepository.disableAccount();
  }

  uploadAvatar(formData: FormData): Observable<ApiResponse<ProfileDto>>  {
    return this.profileRepository.uploadAvatar(formData);
  }

  deleteAvatar(): Observable<ApiResponse<ProfileDto>>  {
    return this.profileRepository.deleteAvatar();
  }

  loadMyPermissions():Observable<ApiResponse<PermissionModel[]>> {
    return this.profileRepository.loadMyPermissions();
  }
}
