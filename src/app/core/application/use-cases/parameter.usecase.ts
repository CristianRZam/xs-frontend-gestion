import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse} from '../../domain/dtos/responses/api.response';
import {ParameterRepository} from '../../domain/repositories/parameter.repository';
import {ParameterViewRequest} from '../../domain/dtos/resquests/parameter-view.request';
import {ParameterModel} from '../../domain/models/parameter.model';
import {ParameterViewResponse} from '../../domain/dtos/responses/parameter-view.response';
import {ParameterFormResponse} from '../../domain/dtos/responses/parameter-form.response';

@Injectable({ providedIn: 'root' })
export class ParameterUseCase {
  constructor(private readonly repository: ParameterRepository) {}

  init(request: ParameterViewRequest): Observable<ApiResponse<ParameterViewResponse>> {
    return this.repository.init(request);
  }

  initForm(id?: number): Observable<ApiResponse<ParameterFormResponse>> {
    return this.repository.initForm(id);
  }

  getParameterById(id: number): Observable<ApiResponse<any>> {
    return this.repository.getParameterById(id);
  }

  create(request: ParameterModel): Observable<ApiResponse<any>> {
    return this.repository.create(request);
  }

  update(request: ParameterModel): Observable<ApiResponse<any>> {
    return this.repository.update(request);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.repository.delete(id);
  }

  updateStatus(id: number): Observable<ApiResponse<any>> {
    return this.repository.updateStatus(id);
  }

  exportPdf(request: ParameterViewRequest): Observable<Blob> {
    return this.repository.exportPdf(request);
  }

  exportExcel(request: ParameterViewRequest): Observable<Blob> {
    return this.repository.exportExcel(request);
  }
}
