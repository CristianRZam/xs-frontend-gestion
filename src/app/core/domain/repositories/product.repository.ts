import {Observable} from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {ProductViewResponse} from '../dtos/responses/product-view.response';
import {ProductViewRequest} from '../dtos/resquests/product-view.request';
import {ProductFormResponse} from '../dtos/responses/product-form.response';
import {ProductModel} from '../models/product.model';
import {ProductPayloadRequest} from '../dtos/resquests/product-payload.request';

export abstract class ProductRepository {
  abstract init(request: ProductViewRequest): Observable<ApiResponse<ProductViewResponse>>;

  abstract initForm(id?: number): Observable<ApiResponse<ProductFormResponse>>;

  abstract create(payload: ProductPayloadRequest): Observable<ApiResponse<ProductModel>>;

  abstract update(payload: ProductPayloadRequest): Observable<ApiResponse<ProductModel>>;

  abstract updateStatus(id: number): Observable<ApiResponse<boolean>>;

  abstract delete(id: number): Observable<ApiResponse<boolean>>;

  abstract exportPdf(request: ProductViewRequest): Observable<Blob>;

  abstract exportExcel(request: ProductViewRequest): Observable<Blob>;

}
