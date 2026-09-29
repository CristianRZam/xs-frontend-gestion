import {Observable} from 'rxjs';
import {CatalogConfigDTO} from '../dtos/responses/catalog-config-dto';
import {CatalogConfigRequest} from '../dtos/resquests/catalog-config.request';
import {ApiResponse} from '../dtos/responses/api.response';

export abstract class CatalogconfigRepository {

  abstract findAll(): Observable<ApiResponse<CatalogConfigDTO[]>>;

  abstract findById(
    id: number
  ): Observable<ApiResponse<CatalogConfigDTO>>;

  abstract create(
    request: CatalogConfigRequest
  ): Observable<ApiResponse<CatalogConfigDTO>>;

  abstract update(
    request: CatalogConfigRequest
  ): Observable<ApiResponse<CatalogConfigDTO>>;

  abstract delete(
    id: number
  ): Observable<ApiResponse<boolean>>;

}
