import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { AuthRepository } from '../../core/domain/repositories/auth.repository';
import { AuthRequest } from '../../core/domain/dtos/resquests/auth.request';
import { AuthResponse } from '../../core/domain/dtos/responses/auth.response';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {
  endpoint = environment.API_URL;

  constructor(private http: HttpClient) {}

  async login(request: AuthRequest): Promise<AuthResponse> {
    return firstValueFrom(
      this.http.post<AuthResponse>(`${this.endpoint}/login`, request)
    );
  }
}
