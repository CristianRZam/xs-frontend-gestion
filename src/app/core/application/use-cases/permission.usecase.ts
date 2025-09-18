import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse} from '../../domain/dtos/responses/api.response';
import {PermissionRepository} from '../../domain/repositories/permission.repository';
import {PermissionUpdateRequest} from '../../domain/dtos/resquests/permission-update.request';

@Injectable({ providedIn: 'root' })
export class PermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  getRoleById(id: number): Observable<ApiResponse<any>> {
    return this.permissionRepository.getByRoleId(id);
  }

  updatePermissionByRole(request: PermissionUpdateRequest): Observable<ApiResponse<any>> {
    return this.permissionRepository.updatePermissionByRole(request);
  }

}
