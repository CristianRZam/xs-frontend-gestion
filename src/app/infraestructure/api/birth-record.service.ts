import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';
import {ParameterViewRequest} from '../../core/domain/dtos/resquests/parameter-view.request';
import {ParameterModel} from '../../core/domain/models/parameter.model';
import {BirthRecordRepository} from '../../core/domain/repositories/birth-record.repository';
import {BirthRecordFilterList} from '../../core/domain/dtos/resquests/birth-record-filter-list';
import {BirthRecordViewResponse} from '../../core/domain/dtos/responses/birth-record-view.response';
import {BirthRecordFormResponse} from '../../core/domain/dtos/responses/birth-record-form.response';
import {BirthRecordResponse} from '../../core/domain/dtos/responses/birth-record.response';
import {BirthRecordRequest} from '../../core/domain/dtos/resquests/birth-record.request';

@Injectable({ providedIn: 'root' })
export class BirthRecordService implements BirthRecordRepository {
  private baseUrl = `${environment.API_URL}/birthRecord`;

  constructor(private http: HttpClient) {}

  init(request: BirthRecordFilterList): Observable<ApiResponse<BirthRecordViewResponse>> {
    return this.http.post<ApiResponse<BirthRecordViewResponse>>(`${this.baseUrl}/init`, request);
  }

  initForm(id?: number): Observable<ApiResponse<BirthRecordFormResponse>> {
    return this.http.post<ApiResponse<BirthRecordFormResponse>>(`${this.baseUrl}/init-form`,
      { id: id ?? null }
    );
  }

  getParameterById(id: number): Observable<ApiResponse<ParameterModel>> {
    return this.http.get<ApiResponse<ParameterModel>>(`${this.baseUrl}/get/${id}`);
  }

  create(request: BirthRecordRequest): Observable<ApiResponse<BirthRecordResponse>> {
    return this.http.post<ApiResponse<BirthRecordResponse>>(
      `${this.baseUrl}/create`,
      request
    );
  }

  update(request: BirthRecordRequest): Observable<ApiResponse<BirthRecordResponse>> {
    return this.http.put<ApiResponse<BirthRecordResponse>>(
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

  exportCertificate(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/certificate/${id}`, {
      responseType: 'blob'
    });
  }

}
