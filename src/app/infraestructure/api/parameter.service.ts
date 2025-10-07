import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';
import {ParameterViewRequest} from '../../core/domain/dtos/resquests/parameter-view.request';
import {ParameterModel} from '../../core/domain/models/parameter.model';
import {ParameterViewResponse} from '../../core/domain/dtos/responses/parameter-view.response';
import {ParameterRepository} from '../../core/domain/repositories/parameter.repository';
import {ParameterFormResponse} from '../../core/domain/dtos/responses/parameter-form.response';

@Injectable({ providedIn: 'root' })
export class ParameterService implements ParameterRepository {
  private baseUrl = `${environment.API_URL}/parameter`;

  constructor(private http: HttpClient) {}

  init(request: ParameterViewRequest): Observable<ApiResponse<ParameterViewResponse>> {
    return this.http.post<ApiResponse<ParameterViewResponse>>(`${this.baseUrl}/init`, request);
  }

  initForm(id?: number): Observable<ApiResponse<ParameterFormResponse>> {
    return this.http.post<ApiResponse<ParameterFormResponse>>(`${this.baseUrl}/init-form`,
      { id: id ?? null }
    );
  }

  getParameterById(id: number): Observable<ApiResponse<ParameterModel>> {
    return this.http.get<ApiResponse<ParameterModel>>(`${this.baseUrl}/get/${id}`);
  }

  create(request: FormData): Observable<ApiResponse<ParameterModel>> {
    return this.http.post<ApiResponse<ParameterModel>>(
      `${this.baseUrl}/create`,
      request
    );
  }

  update(request: FormData): Observable<ApiResponse<ParameterModel>> {
    return this.http.put<ApiResponse<ParameterModel>>(
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

  exportPdf(request: ParameterViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-pdf`, request, {
      responseType: 'blob',
    });
  }

  exportExcel(request: ParameterViewRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export-excel`, request, {
      responseType: 'blob',
    });
  }

  download(filename: string): Observable<Blob> {
    const request = { filename };
    return this.http.post(`${this.baseUrl}/download-file`, request, {
      responseType: 'blob',
    });
  }



}
