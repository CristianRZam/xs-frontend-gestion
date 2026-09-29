import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CatalogconfigRepository } from '../../domain/repositories/catalogconfig.repository';
import { ApiResponse } from '../../domain/dtos/responses/api.response';
import {CatalogConfigDTO} from '../../domain/dtos/responses/catalog-config-dto';
import {CatalogConfigRequest} from '../../domain/dtos/resquests/catalog-config.request';

@Injectable({
  providedIn: 'root'
})
export class CatalogConfigUseCase {

  constructor(
    private readonly repository: CatalogconfigRepository
  ) {}

  findAll(): Observable<ApiResponse<CatalogConfigDTO[]>> {
    return this.repository.findAll();
  }

  findById(id: number): Observable<ApiResponse<CatalogConfigDTO>> {
    return this.repository.findById(id);
  }

  create(
    request: CatalogConfigRequest
  ): Observable<ApiResponse<CatalogConfigDTO>> {
    return this.repository.create(request);
  }

  update(
    request: CatalogConfigRequest
  ): Observable<ApiResponse<CatalogConfigDTO>> {
    return this.repository.update(request);
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.repository.delete(id);
  }
}
