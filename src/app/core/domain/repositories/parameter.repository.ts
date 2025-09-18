import { Observable } from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {ParameterModel} from '../models/parameter.model';
import {ParameterViewRequest} from '../dtos/resquests/parameter-view.request';
import {ParameterViewResponse} from '../dtos/responses/parameter-view.response';
import {ParameterFormResponse} from '../dtos/responses/parameter-form.response';

export abstract class ParameterRepository {
  abstract init(request: ParameterViewRequest): Observable<ApiResponse<ParameterViewResponse>>;
  abstract initForm(id?: number): Observable<ApiResponse<ParameterFormResponse>>;
  abstract getParameterById(id: number): Observable<ApiResponse<any>>;
  abstract create(request: ParameterModel): Observable<ApiResponse<any>>;
  abstract update(request: ParameterModel): Observable<ApiResponse<any>>;
  abstract delete(id: number): Observable<ApiResponse<any>>;
  abstract updateStatus(id: number): Observable<ApiResponse<any>>;
  abstract exportPdf(request: ParameterViewRequest): Observable<Blob>;
  abstract exportExcel(request: ParameterViewRequest): Observable<Blob>;
}
