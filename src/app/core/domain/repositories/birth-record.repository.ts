import { Observable } from 'rxjs';
import {ApiResponse} from '../dtos/responses/api.response';
import {ParameterModel} from '../models/parameter.model';
import {ParameterViewRequest} from '../dtos/resquests/parameter-view.request';
import {BirthRecordFilterList} from '../dtos/resquests/birth-record-filter-list';
import {BirthRecordViewResponse} from '../dtos/responses/birth-record-view.response';
import {BirthRecordFormResponse} from '../dtos/responses/birth-record-form.response';
import {BirthRecordRequest} from '../dtos/resquests/birth-record.request';
import {BirthRecordResponse} from '../dtos/responses/birth-record.response';

export abstract class BirthRecordRepository {
  abstract init(request: BirthRecordFilterList): Observable<ApiResponse<BirthRecordViewResponse>>;
  abstract initForm(id?: number): Observable<ApiResponse<BirthRecordFormResponse>>;
  abstract getParameterById(id: number): Observable<ApiResponse<any>>;
  abstract create(request: BirthRecordRequest): Observable<ApiResponse<BirthRecordResponse>>;
  abstract update(request: BirthRecordRequest): Observable<ApiResponse<BirthRecordResponse>>;
  abstract delete(id: number): Observable<ApiResponse<any>>;
  abstract updateStatus(id: number): Observable<ApiResponse<any>>;
  abstract exportPdf(request: ParameterViewRequest): Observable<Blob>;
  abstract exportExcel(request: ParameterViewRequest): Observable<Blob>;
  abstract download(filename: string): Observable<Blob>;
  abstract exportCertificate(id: number): Observable<Blob>;
}
