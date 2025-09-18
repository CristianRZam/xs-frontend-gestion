import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { AuthRepository } from '../../core/domain/repositories/auth.repository';
import { AuthRequest } from '../../core/domain/dtos/resquests/auth.request';
import { AuthResponse } from '../../core/domain/dtos/responses/auth.response';
import { environment } from '../../../environments/environment';
import {ApiResponse} from '../../core/domain/dtos/responses/api.response';

@Injectable({ providedIn: 'root' })
export class AuthService implements AuthRepository {
  endpoint = environment.API_URL;

  constructor(private http: HttpClient) {}

  async login(request: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    return firstValueFrom(
      this.http.post<ApiResponse<AuthResponse>>(`${this.endpoint}/login`, request)
    );
  }
}
