import { Injectable } from '@angular/core';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { RoleViewResponse } from '../../domain/dtos/responses/role-view.response';
import { Observable } from 'rxjs';
import {RoleViewRequest} from '../../domain/dtos/resquests/role-view.request';
import {RoleModel} from '../../domain/models/role.model';
import {ApiResponse} from '../../domain/dtos/responses/api.response';

@Injectable({ providedIn: 'root' })
export class RoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  init(request: RoleViewRequest): Observable<ApiResponse<any>> {
    return this.roleRepository.init(request);
  }

  getRoleById(id: number): Observable<ApiResponse<any>> {
    return this.roleRepository.getRoleById(id);
  }

  create(request: RoleModel): Observable<ApiResponse<any>> {
    return this.roleRepository.create(request);
  }

  update(request: RoleModel): Observable<ApiResponse<any>> {
    return this.roleRepository.update(request);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.roleRepository.delete(id);
  }
}
