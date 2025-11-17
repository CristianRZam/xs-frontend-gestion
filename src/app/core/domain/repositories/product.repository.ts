import {Observable} from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {ProductViewResponse} from '../dtos/responses/product-view.response';
import {ProductViewRequest} from '../dtos/resquests/product-view.request';
import {ProductFormResponse} from '../dtos/responses/product-form.response';
import {ProductRequest} from '../dtos/resquests/product.request';
import {ProductModel} from '../models/product.model';

export abstract class ProductRepository {
  abstract init(request: ProductViewRequest): Observable<ApiResponse<ProductViewResponse>>;

  abstract initForm(id?: number): Observable<ApiResponse<ProductFormResponse>>;

  abstract create(request: ProductRequest): Observable<ApiResponse<ProductModel>>;

  abstract update(request: ProductRequest): Observable<ApiResponse<ProductModel>>;

  abstract updateStatus(id: number): Observable<ApiResponse<boolean>>;

  abstract delete(id: number): Observable<ApiResponse<boolean>>;

  abstract exportPdf(request: ProductViewRequest): Observable<Blob>;

  abstract exportExcel(request: ProductViewRequest): Observable<Blob>;

}
