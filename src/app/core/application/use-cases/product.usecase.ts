import {Injectable} from '@angular/core';
import {ProductRepository} from '../../domain/repositories/product.repository';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../domain/dtos/responses/api.response';
import {ProductViewResponse} from '../../domain/dtos/responses/product-view.response';
import {ProductViewRequest} from '../../domain/dtos/resquests/product-view.request';
import {ProductFormResponse} from '../../domain/dtos/responses/product-form.response';
import {ProductModel} from '../../domain/models/product.model';
import {ProductPayloadRequest} from '../../domain/dtos/resquests/product-payload.request';

@Injectable({ providedIn: 'root' })
export class ProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  init(request: ProductViewRequest): Observable<ApiResponse<ProductViewResponse>> {
    return this.repository.init(request);
  }

  initForm(id?: number):Observable<ApiResponse<ProductFormResponse>> {
    return this.repository.initForm(id);
  }

  create(payload: ProductPayloadRequest): Observable<ApiResponse<ProductModel>> {
    return this.repository.create(payload);
  }

  update(payload: ProductPayloadRequest): Observable<ApiResponse<ProductModel>> {
    return this.repository.update(payload);
  }

  updateStatus(id: number): Observable<ApiResponse<boolean>> {
    return this.repository.updateStatus(id);
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.repository.delete(id);
  }

  exportPdf(request: ProductViewRequest): Observable<Blob> {
    return this.repository.exportPdf(request);
  }

  exportExcel(request: ProductViewRequest): Observable<Blob> {
    return this.repository.exportExcel(request);
  }
}
