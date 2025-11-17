import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';
import {ProductViewResponse} from '../../core/domain/dtos/responses/product-view.response';
import {ProductRepository} from '../../core/domain/repositories/product.repository';
import {ProductViewRequest} from '../../core/domain/dtos/resquests/product-view.request';
import {ProductFormResponse} from '../../core/domain/dtos/responses/product-form.response';
import {ProductRequest} from '../../core/domain/dtos/resquests/product.request';
import {ProductModel} from '../../core/domain/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService implements ProductRepository {
  private baseUrl = `${environment.API_URL}/product`;

  constructor(private http: HttpClient) {}

  init(request: ProductViewRequest): Observable<ApiResponse<ProductViewResponse>> {
    return this.http.post<ApiResponse<ProductViewResponse>>(`${this.baseUrl}/init`, request);
  }

  initForm(id?: number): Observable<ApiResponse<ProductFormResponse>> {
    return this.http.post<ApiResponse<ProductFormResponse>>(`${this.baseUrl}/init-form`,
      { id: id ?? null }
    );
  }

  create(request: ProductRequest): Observable<ApiResponse<ProductModel>> {
    return this.http.post<ApiResponse<ProductModel>>(
      `${this.baseUrl}/create`,
      request
    );
  }

  update(request: ProductRequest): Observable<ApiResponse<ProductModel>> {
    return this.http.put<ApiResponse<ProductModel>>(
      `${this.baseUrl}/update`,
      request
    );
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.baseUrl}/delete/${id}`
    );
  }

  updateStatus(id: number): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.baseUrl}/update-status`,
      id
    );
  }

  exportPdf(request: ProductViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-pdf`, request, {
      responseType: 'blob',
    });
  }

  exportExcel(request: ProductViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-excel`, request, {
      responseType: 'blob',
    });
  }

}
