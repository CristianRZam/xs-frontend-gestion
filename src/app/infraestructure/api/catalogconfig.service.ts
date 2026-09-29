import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../core/domain/dtos/responses/api.response';
import { CatalogConfigRequest } from '../../core/domain/dtos/resquests/catalog-config.request';
import {CatalogconfigRepository} from '../../core/domain/repositories/catalogconfig.repository';
import {CatalogConfigDTO} from '../../core/domain/dtos/responses/catalog-config-dto';

@Injectable({
  providedIn: 'root'
})
export class CatalogConfigService implements CatalogconfigRepository {

  private baseUrl = `${environment.API_URL}/catalog-config`;

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<ApiResponse<CatalogConfigDTO[]>> {
    return this.http.get<ApiResponse<CatalogConfigDTO[]>>(
      `${this.baseUrl}/all`
    );
  }

  findById(id: number): Observable<ApiResponse<CatalogConfigDTO>> {
    return this.http.get<ApiResponse<CatalogConfigDTO>>(
      `${this.baseUrl}/${id}`
    );
  }

  create(
    request: CatalogConfigRequest
  ): Observable<ApiResponse<CatalogConfigDTO>> {
    return this.http.post<ApiResponse<CatalogConfigDTO>>(
      `${this.baseUrl}/create`,
      request
    );
  }

  update(
    request: CatalogConfigRequest
  ): Observable<ApiResponse<CatalogConfigDTO>> {
    return this.http.put<ApiResponse<CatalogConfigDTO>>(
      `${this.baseUrl}/update`,
      request
    );
  }

  delete(
    id: number
  ): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.baseUrl}/delete/${id}`
    );
  }
}
