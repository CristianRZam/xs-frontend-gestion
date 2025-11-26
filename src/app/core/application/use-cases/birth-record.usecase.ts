import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiResponse} from '../../domain/dtos/responses/api.response';
import {ParameterViewRequest} from '../../domain/dtos/resquests/parameter-view.request';
import {ParameterModel} from '../../domain/models/parameter.model';
import {BirthRecordViewResponse} from '../../domain/dtos/responses/birth-record-view.response';
import {BirthRecordFilterList} from '../../domain/dtos/resquests/birth-record-filter-list';
import {BirthRecordRepository} from '../../domain/repositories/birth-record.repository';
import {BirthRecordFormResponse} from '../../domain/dtos/responses/birth-record-form.response';
import {BirthRecordResponse} from '../../domain/dtos/responses/birth-record.response';
import {BirthRecordRequest} from '../../domain/dtos/resquests/birth-record.request';

@Injectable({ providedIn: 'root' })
export class BirthRecordUsecase {
  constructor(private readonly repository: BirthRecordRepository) {}

  init(request: BirthRecordFilterList): Observable<ApiResponse<BirthRecordViewResponse>> {
    return this.repository.init(request);
  }

  initForm(id?: number): Observable<ApiResponse<BirthRecordFormResponse>> {
    return this.repository.initForm(id);
  }

  getParameterById(id: number): Observable<ApiResponse<any>> {
    return this.repository.getParameterById(id);
  }

  create(request: BirthRecordRequest): Observable<ApiResponse<BirthRecordResponse>> {
    return this.repository.create(request);
  }

  update(request: BirthRecordRequest): Observable<ApiResponse<BirthRecordResponse>> {
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

  download(filename: string): Observable<Blob> {
    return this.repository.download(filename);
  }

  exportCertificate(id: number): Observable<Blob> {
    return this.repository.exportCertificate(id);
  }
}
