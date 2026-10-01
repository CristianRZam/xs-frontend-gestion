import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/responses/api.response';
import { PageResponse } from '../dtos/responses/page.response';
import { OrderStatusRequest } from '../dtos/resquests/commerce.request';
import { OrderModel } from '../models/commerce.model';
export abstract class OrderRepository { abstract getPage(page: number, size: number, fromDate?: string, toDate?: string, status?: string, search?: string): Observable<ApiResponse<PageResponse<OrderModel>>>; abstract getById(id: number): Observable<ApiResponse<OrderModel>>; abstract create(request: Omit<OrderModel, 'id'>): Observable<ApiResponse<OrderModel>>; abstract update(id: number, request: OrderModel): Observable<ApiResponse<OrderModel>>; abstract updateStatus(id: number, request: OrderStatusRequest): Observable<ApiResponse<OrderModel>>; abstract delete(id: number): Observable<ApiResponse<void>>; }
