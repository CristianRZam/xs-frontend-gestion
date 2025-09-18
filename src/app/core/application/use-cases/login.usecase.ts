import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthRequest } from '../../domain/dtos/resquests/auth.request';
import { AuthResponse } from '../../domain/dtos/responses/auth.response';
import {ApiResponse} from '../../domain/dtos/responses/api.response';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(request: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    return await this.authRepository.login(request);
  }
}
